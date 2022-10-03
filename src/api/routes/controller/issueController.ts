import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import Container from "typedi";
import { UserLatlng } from "../../../interface/Issue";

export default {
	async fixedPoint(req: Request, res: Response) {
		const IssueServiceInstance = Container.get(IssueService);
		const data = await IssueServiceInstance.getFixedPointIssues();

		res.status(200).json({
			success: true,
			message: "List of issues around the fixed point",
			data: data,
		});
	},

	async userPoint(req: Request, res: Response) {
		const userPointData: UserLatlng = {
			lat: req.body.issueRequest.user_latitude,
			lng: req.body.issueRequest.user_longitude,
		};

		const IssueServiceInstance = Container.get(IssueService);
		const { data } = await IssueServiceInstance.getUserPointIssues(userPointData);

		res.status(200).json({
			success: true,
			message: "List of issues around the user point",
			data: data,
		});
	},

	async issueInfo(req: Request, res: Response) {
		const { issueNo } = req.params;
		const IssueServiceInstance = Container.get(IssueService);
		const { data } = await IssueServiceInstance.getIssueInfo(issueNo);

		res.status(200).json({
			success: true,
			message: "List of issues around the user point",
			data: data, // TODO:
		});
	},
	async solveIssue(req: Request, res: Response) {},
};
