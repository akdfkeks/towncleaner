import { IssueInfo, IssueCreateReq, Bound, IssueListReq } from "../interface/Issue";
import { Inject, Service } from "typedi";
import IssueModel from "../model/IssueModel";
import AuthModel from "../model/AuthModel";
import config from "../config";
import { detectObject } from "../function/childWorker";

const fixedIssuePointList: IssueInfo[] = [
	{
		title: "현호집",
		body: "현호네 집입니다",
		class: 0,
		location: {
			lat: 37.454448442968726,
			lng: 127.130440332797,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		title: "현호집앞 GS25",
		body: "현호네 집 앞 GS25 편의점 입니다",
		class: 1,
		location: {
			lat: 37.45475010681343,
			lng: 127.13059908661702,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		title: "현호집주변 CU",
		body: "현호네 집 앞 CU 편의점 입니다",
		class: 2,
		location: {
			lat: 37.4540213271891,
			lng: 127.12965410009392,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		title: "현호집앞 더러운곳",
		body: "현호가 쓰레기 무단투기하는 장소입니다",
		class: 3,
		location: {
			lat: 37.45413091149697,
			lng: 127.13037196908954,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
];

@Service()
class IssueService {
	@Inject("IssueModel") private issueModel: IssueModel;
	@Inject("AuthModel") private authModel: AuthModel;

	public async getFixedPointIssues() {
		return { data: fixedIssuePointList };
	}

	public async getUserPointIssueList(userData: IssueListReq) {
		const { user, bound } = userData;

		// 여기 변수명 헷갈리니까 수정하기.
		const userBoundIssueList = await this.issueModel.getIssueListByUserBound(bound);
		const userPointIssueList = userBoundIssueList.map((issue) => {
			return {
				id: issue.id,
				userId: issue.user_id,
				title: issue.title,
				category: issue.class,
				body: issue.body,
				created_at: issue.created_at,
				location: {
					lat: issue.user_lat,
					lng: issue.user_lng,
				},
			};
		});

		// 임시로 fixedIssuePointList 반환
		return { userPointIssueList: fixedIssuePointList };
	}

	public async getIssueInfo(issueId: number) {
		const data = await this.issueModel.getIssueInfo(issueId);
		return { data };
	}

	public async createIssue(issueReq: IssueCreateReq) {
		const issueCreationResult = await this.issueModel.createIssue(issueReq);
		const { fileName } = issueReq;

		if (!issueCreationResult) throw new Error("Issue creation failed");

		// 여기서 이미지를 업로드
		/*
		TODO: Child Process 생성하여 ai 모델에 전달 하는 비동기함수 하나 만들어서 
		여기서 실행만 하기. 해당 함수 안에서는, 파일 이름을 통해서 .py 에 이미지 전달 후 
		결과가 나오면 DB 에 분류 결과 저장
		*/
		detectObject(fileName, issueCreationResult.id);

		return { createdIssue: issueCreationResult };
	}

	// private getBoundSize(userData: UserBound) {
	// 	const width = Number(userData.northEast.lng) - Number(userData.southWest.lng);
	// 	const height = Number(userData.northEast.lat) - Number(userData.southWest.lat);

	// 	const result = width * height;

	// 	if (result) return true;
	// }
}

export default IssueService;
