import prisma from "../config/prisma";
import Container from "typedi";
import { UserBound } from "@/interface/Issue";

class IssueModel {
	constructor() {}
	async postIssue() {}

	async getIssuesByUserLocation(data: UserBound) {
		const issueList = await prisma.issue.findMany({
			where: {
				user_lat: {
					lte: Number(data.northEast.lat), // max
					gte: Number(data.southWest.lat), // min
				},
				user_lng: {
					lte: Number(data.northEast.lng), // max
					gte: Number(data.southWest.lng), // min
				},
				activated: true,
			},
			select: {
				id: true,
				user_id: true,
				solved: true,
				title: true,
				body: true,
				created_at: true,
				user_lat: true,
				user_lng: true,
			},
		});
		if (issueList) {
			return { issueList };
		} else throw new Error("No issues found");
	}

	async createIssue(data) {
		const user = await prisma.user.findUnique({
			where: { id: data.user.id },
			select: { id: true },
		});
		const createResult = await prisma.issue.create({
			data: {
				user: {
					connect: {
						id: user.id,
					},
				},
				title: data.issue.title,
				body: data.issue.body,
				user_lat: data.issue.location.lat,
				user_lng: data.issue.location.lng,
			},
		});
		return { data: createResult };
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
