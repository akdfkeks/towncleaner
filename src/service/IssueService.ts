import { IssuePoint, UserLatlng } from "../interface/Issue";
import { Inject, Service } from "typedi";
import IssueModel from "../model/IssueModel";
import AuthModel from "../model/AuthModel";

const fixedIssuePointList: IssuePoint[] = [
	{
		title: "현호집",
		body: "현호네 집입니다",
		class: "pollution",
		location: {
			lat: "37.454448442968726",
			lng: "127.130440332797",
		},
		img: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		title: "현호집앞 GS25",
		body: "현호네 집 앞 GS25 편의점 입니다",
		class: "pollution",
		location: {
			lat: "37.45475010681343",
			lng: "127.13059908661702",
		},
		img: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		title: "현호집주변 CU",
		body: "현호네 집 앞 CU 편의점 입니다",
		class: "pollution",
		location: {
			lat: "37.4540213271891",
			lng: "127.12965410009392",
		},
		img: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		title: "현호집앞 더러운곳",
		body: "현호가 쓰레기 무단투기하는 장소입니다",
		class: "pollution",
		location: {
			lat: "37.45413091149697",
			lng: "127.13037196908954",
		},
		img: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
];

@Service()
class IssueService {
	@Inject("IssueModel") private issueModel: IssueModel;
	@Inject("AuthModel") private authModel: AuthModel;

	async getFixedPointIssues() {
		return { fixedIssuePointList };
	}

	async getUserPointIssues(userData: UserLatlng) {
		const data = await this.issueModel.getIssuesByUserLocation(userData);
		return { data };
	}

	async getIssueInfo(issueId: string) {
		const data = await this.issueModel.getIssueInfo(issueId);
		return { data };
	}
}

export default IssueService;
