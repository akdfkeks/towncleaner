import { IssueImageInfo, IssueSolveReq, LatLng } from "../interface/Issue";
import { IssueListReq, IssueCreateReq } from "../interface/Issue";
import { IssueInfo } from "../interface/Issue";
import { Inject, Service } from "typedi";
import IssueModel from "../model/IssueModel";
import AuthModel from "../model/AuthModel";
import { getLatLngFromImage } from "../function/exifParser";
import EventEmitter from "eventemitter3";
import { eventEmitter } from "../loader/listener";
import { errorGenerator } from "../function/errorTypeChecker";
import { MSG, fixedPointIssueList } from "../config/message";
import { Issue } from "@prisma/client";

@Service()
class IssueService {
	@Inject("IssueModel") private issueModel: IssueModel;
	@Inject("AuthModel") private authModel: AuthModel;
	private eventEmitter: EventEmitter;

	constructor() {
		this.eventEmitter = eventEmitter;
	}

	public async getFixedPointIssues() {
		return { issueList: fixedPointIssueList };
	}

	public async getUserPointIssueList(issueListReq: IssueListReq) {
		try {
			const { user, point } = issueListReq;

			// 별도의 함수로 분리할까?
			if (point.lng > 132 || point.lng < 123) return { issueList: null };
			if (point.lat > 43 || point.lat < 33) return { issueList: null };

			const userPointIssueList = await this.issueModel.getIssueListByUserPoint(point);
			const issueList = userPointIssueList.map((issue) => {
				const element: IssueInfo = {
					issueId: issue.id,
					issuer: issue.user_id,
					title: issue.title,
					class: issue.class,
					body: issue.body,
					createdAt: issue.created_at,
					issueLocation: {
						lat: issue.Issue_img[0].lat,
						lng: issue.Issue_img[0].lng,
					},
					userLocation: {
						lat: issue.user_lat,
						lng: issue.user_lng,
					},
					imgUrl: issue.Issue_img[0].src || null,
				};
				return element;
			});

			// ------------------------forDev------------------------
			issueList.push(...fixedPointIssueList);
			// ------------------------forDev------------------------

			return { issueList };
		} catch (err) {
			throw errorGenerator(err);
		}
	}

	public async getIssueInfo(issueId: number) {
		try {
			const data = await this.issueModel.getIssueInfo(issueId);
			return { data };
		} catch (err) {
			throw errorGenerator(err);
		}
	}

	public async createIssue(issueReq: IssueCreateReq): Promise<{ createdIssueResult: Issue }> {
		try {
			const { lat, lng }: LatLng = getLatLngFromImage(issueReq.image.fileName);

			const issueCreationResult = await this.issueModel.createIssue(issueReq);

			const imageInfo = {
				issueId: issueCreationResult.id,
				fileName: issueReq.image.fileName,
				location: { lat, lng },
			};

			this.eventEmitter.emit("processImage", imageInfo);

			return { createdIssueResult: issueCreationResult };
		} catch (err) {
			throw errorGenerator(err);
		}
	}

	public async solveIssue(issueReq: IssueSolveReq) {
		try {
			const { lat, lng }: LatLng = getLatLngFromImage(issueReq.image.fileName);

			//

			return { issueSolveResult: true };
		} catch (err) {
			throw errorGenerator(err);
		}
	}
}

export default IssueService;
