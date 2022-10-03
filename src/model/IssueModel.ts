import prisma from "../loader/prisma";
import Container from "typedi";

class IssueModel {
	constructor() {}
	async postIssue() {}

	async getIssuesByUserLocation(data: any) {
		const issueList = await prisma.issue.findMany({});
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
