import prisma from "../loader/prisma";
import Container from "typedi";
import { UserBound } from "@/interface/Issue";

class IssueModel {
	constructor() {}
	async postIssue() {}

	async getIssuesByUserLocation(data: UserBound) {
		const issueList = await prisma.issue.findMany({
			where: {
				lat: {
					lte: Number(data.northEast.lat), // max
					gte: Number(data.southWest.lat), // min
				},
				lng: {
					lte: Number(data.northEast.lng), // max
					gte: Number(data.southWest.lng), // min
				},
				is_active: true,
			},
			select: {
				id: true,
				user_id: true,
				is_solved: true,
				title: true,
				body: true,
				created_at: true,
				lat: true,
				lng: true,
				img: true,
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
				user_id: user.id,
				title: data.issue.title,
				body: data.issue.body,
				lat: data.issue.location.lat,
				lng: data.issue.location.lng,
			},
		});
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
