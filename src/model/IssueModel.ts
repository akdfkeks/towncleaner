import prisma from "../config/prisma";
import Container from "typedi";
import { IssueCreateReq, UserBound } from "@/interface/Issue";

class IssueModel {
	constructor() {}

	async getIssuesByUserBound(userBound: UserBound) {
		const userBoundIssueList = await prisma.issue.findMany({
			where: {
				user_lat: {
					lte: Number(userBound.ne.lat), // max
					gte: Number(userBound.sw.lat), // min
				},
				user_lng: {
					lte: Number(userBound.ne.lng), // max
					gte: Number(userBound.sw.lng), // min
				},
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
			},
		});

		if (userBoundIssueList) {
			return userBoundIssueList;
		} else throw new Error("No issues found");
	}

	async createIssue(issueRequest: IssueCreateReq) {
		const user = await prisma.user.findUnique({
			where: { id: issueRequest.user.id },
			select: { id: true },
		});
		const createResult = await prisma.issue.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
				title: issueRequest.issue.title,
				class: issueRequest.issue.class,
				body: issueRequest.issue.body,
				user_lat: Number(issueRequest.issue.location.lat),
				user_lng: Number(issueRequest.issue.location.lng),
			},
		});
		return createResult;
	}

	async getIssueInfo(issueId: string) {
		const issueInfo = await prisma.issue.findUnique({
			where: {
				id: parseInt(issueId),
			},
		});
	}
}

Container.set("IssueModel", new IssueModel());

export default IssueModel;
