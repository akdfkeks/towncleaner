import { IssuePoint, IssueListRequest } from "@/interface/Issue";
import { Inject, Service } from "typedi";
import IssueModel from "@/model/IssueModel";
import UserModel from "@/model/UserModel";

const fixedIssuePointList: IssuePoint[] = [
	{
		title: "현호집",
		body: "현호네 집입니다",
		class: "pollution",
		latitude: "37.454448442968726",
		longitude: "127.130440332797",
	},
	{
		title: "현호집앞 GS25",
		body: "현호네 집 앞 GS25 편의점 입니다",
		class: "pollution",
		latitude: "37.45475010681343",
		longitude: "127.13059908661702",
	},
	{
		title: "현호집주변 CU",
		body: "현호네 집 앞 CU 편의점 입니다",
		class: "pollution",
		latitude: "37.4540213271891",
		longitude: "127.12965410009392",
	},
	{
		title: "현호집앞 더러운곳",
		body: "현호가 쓰레기 무단투기하는 장소입니다",
		class: "pollution",
		latitude: "37.45413091149697",
		longitude: "127.13037196908954",
	},
];

@Service()
class IssueService {
	constructor(
		@Inject("IssueModel") private issueModel: IssueModel,
		@Inject("UserModel") private userModel: UserModel
	) {}

	async getFixedPointIssues() {
		return { fixedIssuePointList };
	}

	async getUserPointIssues(userData: IssueListRequest) {
		return {};
	}
	/**
	 * userData 의 위도 및 경도를 기준으로
	 * 인근의 이슈들을 조회하여 반환
	 */
}

export default IssueService;
