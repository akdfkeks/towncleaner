import { IssueSolveReq, LatLng } from "../interface/IssueTemp";
import { IssueListReq, IssueCreateReq } from "../interface/IssueTemp";
import { IssueInfo } from "../interface/IssueTemp";
import { Inject, Service } from "typedi";
import IssueModel from "../model/IssueModel";
import AuthModel from "../model/AuthModel";
import { getLatLngFromImage } from "../function/exifParser";
import { Decimal } from "@prisma/client/runtime";
import EventEmitter from "eventemitter3";
import { eventEmitter } from "../loader/listener";
import { errorFactory } from "../function/errorTypeChecker";
import { IssueCreateError, IssueImageExifError } from "../error/Error";
import { MSG } from "../config/message";
import { Issue } from "@prisma/client";

const fixedIssuePointList: IssueInfo[] = [
	{
		issueId: 1000,
		issuer: "test1",
		createdAt: null,
		title: "현호집",
		body: "현호네 집입니다",
		class: 0,
		issueLoc: {
			lat: new Decimal(37.454448442968726),
			lng: new Decimal(127.130440332797),
		},
		reportingLoc: {
			lat: new Decimal(37.454448442968726),
			lng: new Decimal(127.130440332797),
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		issueId: 1001,
		issuer: "test1",
		createdAt: null,
		title: "현호집앞 GS25",
		body: "현호네 집 앞 GS25 편의점 입니다",
		class: 1,
		issueLoc: {
			lat: new Decimal(37.45475010681343),
			lng: new Decimal(127.13059908661702),
		},
		reportingLoc: {
			lat: new Decimal(37.45475010681343),
			lng: new Decimal(127.13059908661702),
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		issueId: 1002,
		issuer: "test1",
		createdAt: null,
		title: "현호집주변 CU",
		body: "현호네 집 앞 CU 편의점 입니다",
		class: 2,
		issueLoc: {
			lat: new Decimal(37.4540213271891),
			lng: new Decimal(127.12965410009392),
		},
		reportingLoc: {
			lat: new Decimal(37.4540213271891),
			lng: new Decimal(127.12965410009392),
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		issueId: 1003,
		issuer: "test1",
		createdAt: null,
		title: "현호집앞 더러운곳",
		body: "현호가 쓰레기 무단투기하는 장소입니다",
		class: 3,
		issueLoc: {
			lat: new Decimal(37.45413091149697),
			lng: new Decimal(127.13037196908954),
		},
		reportingLoc: {
			lat: new Decimal(37.45413091149697),
			lng: new Decimal(127.13037196908954),
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
];

@Service()
class IssueService {
	@Inject("IssueModel") private issueModel: IssueModel;
	@Inject("AuthModel") private authModel: AuthModel;
	private eventEmitter: EventEmitter;

	constructor() {
		this.eventEmitter = eventEmitter;
	}

	public async getFixedPointIssues() {
		return { data: fixedIssuePointList };
	}

	public async getUserPointIssueList(issueListReq: IssueListReq) {
		try {
			const { user, bound } = issueListReq;
			if (Number(bound.sw.lat) > 128 || bound.sw.lat == null) return { issueList: null };
			// 여기 변수명 헷갈리니까 수정하기.
			const userBoundIssueList = await this.issueModel.getIssueListByUserBound(bound);
			const issueList = userBoundIssueList.map((issue) => {
				const element: IssueInfo = {
					issueId: issue.id,
					issuer: issue.user_id,
					title: issue.title,
					class: issue.class,
					body: issue.body,
					createdAt: issue.created_at,
					issueLoc: {
						lat: issue.Issue_img[0].lat || null,
						lng: issue.Issue_img[0].lng || null,
					},
					reportingLoc: {
						lat: issue.user_lat || null,
						lng: issue.user_lng || null,
					},
					imgUrl: issue.Issue_img[0].src || null,
				};
				return element;
			});
			console.log(issueList);
			// ------------------------forDev------------------------
			// 임시로 fixedIssuePointList 같이 반환
			issueList.push(...fixedIssuePointList);
			// ------------------------forDev------------------------

			return { issueList };
		} catch (err) {
			console.log(err);
			throw errorFactory(err);
		}
	}

	public async getIssueInfo(issueId: number) {
		try {
			const data = await this.issueModel.getIssueInfo(issueId);
			return { data };
		} catch (err) {
			throw errorFactory(err);
		}
	}

	public async createIssue(issueReq: IssueCreateReq): Promise<{ createdIssueResult: Issue }> {
		try {
			// Extract GPS Data from Image
			const { lat, lng }: LatLng = getLatLngFromImage(issueReq.image.fileName);
			issueReq.image.location = { lat: lat, lng: lng };

			// Get issueCreation Result from Database
			const issueCreationResult: Issue = await this.issueModel.createIssue(issueReq);
			if (!issueCreationResult) throw new IssueCreateError(MSG.FAILURE.ISSUE.CREATE);

			// For Event listener
			const imageUploadParams = {
				issueId: issueCreationResult.id,
				fileName: issueReq.image.fileName,
				location: issueReq.image.location,
			};

			// Event trigger: Image uploading and create image record
			this.eventEmitter.emit("processImage", imageUploadParams);

			return { createdIssueResult: issueCreationResult };
		} catch (err) {
			throw errorFactory(err);
		}
	}

	public async solveIssue(issueReq: IssueSolveReq) {
		try {
			const { lat, lng } = getLatLngFromImage(issueReq.image.fileName);

			//

			return { issueSolveResult: null };
		} catch (err) {
			throw errorFactory(err);
		}
	}

	// private getBoundSize(userData: UserBound) {
	// 	const width = Number(userData.northEast.lng) - Number(userData.southWest.lng);
	// 	const height = Number(userData.northEast.lat) - Number(userData.southWest.lat);

	// 	const result = width * height;

	// 	if (result) return true;
	// }
}

export default IssueService;
