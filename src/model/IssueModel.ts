import prisma from "../config/prisma";
import { Service } from "typedi";
import { IssueCreateReq, Bound } from "../interface/IssueTemp";
import config from "../config";

@Service()
class IssueModel {
	constructor() {}

	async getIssueListByUserBound(userBound: Bound) {
		const userBoundIssueList = await prisma.issue.findMany({
			where: {
				// user_lat: {
				// 	lte: userBound.ne.lat, // max
				// 	gte: userBound.sw.lat, // min
				// },
				// user_lng: {
				// 	lte: userBound.ne.lng, // max
				// 	gte: userBound.sw.lng, // min
				// },
				activated: true,
				solved: false,
			},

			select: {
				id: true,
				user_id: true,
				solved: true,
				title: true,
				class: true,
				body: true,
				created_at: true,
				user_lat: true,
				user_lng: true,
				Issue_img: true,
			},
		});

		if (userBoundIssueList) {
			return userBoundIssueList;
		} else throw new Error("No issues found");
	}

	async createIssueWithImageInfo(issueRequest: IssueCreateReq) {
		const { user, issue, image } = issueRequest;

		const creationResult = await prisma.issue.create({
			data: {
				user: {
					connect: { id: user.id },
				},
				activated: config.isDev,
				title: issue.title,
				class: issue.class,
				body: issueRequest.issue.body,
				user_lat: issue.reportingLoc.lat,
				user_lng: issue.reportingLoc.lng,
			},
		});

		return creationResult;
	}

	async getIssueInfo(issueId: number) {
		const issueInfo = await prisma.issue.findUnique({
			where: {
				id: issueId,
			},
		});
	}
}

export default IssueModel;
