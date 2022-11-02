import { Issue, IssueImageInfo, LatLng } from "../interface/Issue";
import { IssueListReq, IssueCreateReq } from "../interface/Issue";
import { Inject, Service } from "typedi";
import IssueModel from "../model/IssueModel";
import AuthModel from "../model/AuthModel";
import { getLatLngFromImage } from "../function/exifParser";
import EventEmitter from "eventemitter3";
import { eventEmitter } from "../loader/listener";
import { errorGenerator } from "../function/errorGenerator";
import { MSG, fixedPointIssueList } from "../config/message";

@Service()
class IssueService {
	@Inject("IssueModel") private issueModel: IssueModel;
	@Inject("AuthModel") private authModel: AuthModel;
	private eventEmitter: EventEmitter;

	constructor() {
		this.eventEmitter = eventEmitter;
	}

	public async getFixedPointIssueList() {
		return { issueList: fixedPointIssueList };
	}

	public async getUserPointIssueList(issueListReq: IssueListReq) {
		try {
			const { user, location } = issueListReq;

			const userPointIssueList = await this.issueModel.getIssueListByUserPoint(location);
			const issueList = userPointIssueList.map((issue) => {
				const element: Issue = {
					issueId: issue.id,
					userId: issue.user_id,
					title: issue.title,
					/* 지도에 표시될 0 ~ 4 값을 가지는 number
					 * 나중에 다 배열형으로 바꾸던 어쩌던 해야할듯
					 * DB 는 배열 지원 안하므로 비즈니스 로직에서 감지된 물체들 읽어와서
					 * 반환할때만 배열형으로 할까 생각중 */
					category: issue.class,
					/* 감지된 물체, 0 ~ 24 값을 가지는 number
					 * 마찬가지로 배열이 되야함 */
					code: issue.Issue_img[0].detected_object[0].class_id,
					body: issue.body,
					createdAt: issue.created_at,
					issueLoc: {
						lat: issue.Issue_img[0].lat,
						lng: issue.Issue_img[0].lng,
					},
					userLoc: {
						lat: issue.user_lat,
						lng: issue.user_lng,
					},
					imgUrl: issue.Issue_img[0].src,
				};
				return element;
			});

			// ------------------------forDev------------------------
			//issueList.push(...fixedPointIssueList);
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

	public async createIssue(issueReq: IssueCreateReq) {
		try {
			const { lat, lng }: LatLng = getLatLngFromImage(issueReq.image.fileName);

			const issueCreationResult = await this.issueModel.createIssue(issueReq);

			const imageInfo = {
				issueId: issueCreationResult.id,
				fileName: issueReq.image.fileName,
				originName: issueReq.image.originName,
				location: { lat, lng },
			};

			this.eventEmitter.emit("issueImage", imageInfo);

			return { createdIssueResult: issueCreationResult };
		} catch (err) {
			throw errorGenerator(err);
		}
	}

	// public async solveIssue(issueReq: IssueSolveReq) {
	// 	try {
	// 		const { lat, lng }: LatLng = getLatLngFromImage(issueReq.image.fileName);

	// 		//

	// 		return { issueSolveResult: true };
	// 	} catch (err) {
	// 		throw errorGenerator(err);
	// 	}
	// }
}

export default IssueService;
