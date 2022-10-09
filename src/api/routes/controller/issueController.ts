import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import Container from "typedi";
import { IssueCreateReq, UserBoundIssuesReq } from "../../../interface/Issue";
import config from "../../../config";
import { saveFileToLocal } from "../../middlewares/saveFile";

export default {
	async fixedPoint(req: Request, res: Response) {
		const IssueServiceInstance = Container.get(IssueService);
		const { data } = await IssueServiceInstance.getFixedPointIssues();

		res.status(200).json({
			success: true,
			message: "List of issues around the fixed point",
			data: data,
		});
	},

	async userBound(req: Request, res: Response, next: NextFunction) {
		// ------------------------isDev------------------------
		if (config.isDev) {
			req.body.user.id = "test1";
			req.body.bound.ne = {
				lat: 37.47297777482192,
				lng: 127.14582172878094,
			};
			req.body.bound.sw = {
				lat: 37.4455422196149,
				lng: 127.12172046412597,
			};
		}
		// ------------------------isDev------------------------

		const userBoundIssusesReq: UserBoundIssuesReq = {
			user: { id: req.body.user.id },
			bound: {
				sw: {
					lat: Number(req.body.user.southWest.lat),
					lng: Number(req.body.user.southWest.lng),
				},
				ne: {
					lat: Number(req.body.user.northEast.lat),
					lng: Number(req.body.user.northEast.lng),
				},
			},
		};
		// TODO : Object Validation

		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { userPointIssueList } = await IssueServiceInstance.getUserPointIssueList(
				userBoundIssusesReq
			);

			res.status(200).json({
				success: true,
				message: "User-point issue list",
				data: userPointIssueList,
			});
		} catch (e) {
			next(e);
		}
	},

	async issueInfo(req: Request, res: Response, next: NextFunction) {
		const { issueNo } = req.params;
		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { data } = await IssueServiceInstance.getIssueInfo(issueNo);

			res.status(200).json({
				success: true,
				message: "Issue Info",
				data: data, // TODO:
			});
		} catch (e) {
			next(e);
		}
	},

	async createIssue(req: Request, res: Response, next: NextFunction) {
		const body = req.body;
		console.log(JSON.stringify(body.issue, null, 2));
		const issueCreateReq: IssueCreateReq = {
			user: req.reqUser,
			issue: {
				title: req.body.title,
				class: Number(req.body.class),
				body: req.body.body,
				location: {
					lat: req.body.lat,
					lng: req.body.lng,
				},
			},
			file: req.file || null,
			// issue: {
			// 	title: req.body.issue.title,
			// 	class: req.body.issue.class,
			// 	location: req.body.issue.location,
			// 	body: req.body.issue.body,
			// },
		};

		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { createResult } = await IssueServiceInstance.createIssue(issueCreateReq);

			res.status(200).json({
				success: true,
				message: "Issue creation success",
				data: createResult,
			});
		} catch (e) {
			next(e);
		}
	},

	async solveIssue(req: Request, res: Response) {},
};
