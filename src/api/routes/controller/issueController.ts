import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import Container from "typedi";
import { UserBound } from "../../../interface/Issue";

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

	async userPoint(req: Request, res: Response, next: NextFunction) {
		const userPointData: UserBound = {
			southWest: {
				lat: Number(req.body.user.southWest.lat),
				lng: Number(req.body.user.southWest.lng),
			},
			northEast: {
				lat: Number(req.body.user.northEast.lat),
				lng: Number(req.body.user.northEast.lng),
			},
		};

		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { data } = await IssueServiceInstance.getUserPointIssues(userPointData);

			res.status(200).json({
				success: true,
				message: "UserPoint issue list",
				data: data,
			});
		} catch (e) {
			next(e);
		}
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
