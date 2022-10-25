import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import { Container } from "typedi";
import { IssueCreateReq, IssueInfo, IssueSolveReq } from "../../../interface/IssueTemp";
import { IssueListReq } from "../../../interface/IssueTemp";
import config from "../../../config";
import { MSG } from "../../../config/message";
import { Decimal } from "@prisma/client/runtime";

export default {
	async devIssueList(req: Request, res: Response, next: NextFunction) {
		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { data } = await IssueServiceInstance.getFixedPointIssues();

			res.status(200).json({
				success: true,
				message: "List of issues around the fixed point",
				data: data,
			});
		} catch (err) {
			return next(err);
		}
	},

	async issueList(req: Request, res: Response, next: NextFunction) {
		//console.log(req.body.user);
		try {
			// ------------------------isDev------------------------
			if (config.isDev) {
				req.reqUser = { id: "test1", name: "dev" };
			}
			// ------------------------isDev------------------------

			const userBoundIssusesReq: IssueListReq = {
				user: { id: req.reqUser.id, name: null },
				bound: {
					sw: {
						lat: new Decimal(req.body.user.southWest.lat),
						lng: new Decimal(req.body.user.southWest.lng),
					},
					ne: {
						lat: new Decimal(req.body.user.northEast.lat),
						lng: new Decimal(req.body.user.northEast.lng),
					},
				},
			};
			// console.log(userBoundIssusesReq.bound);
			const IssueServiceInstance = Container.get(IssueService);
			const { issueList } = await IssueServiceInstance.getUserPointIssueList(
				userBoundIssusesReq
			);

			res.status(200).json({
				success: true,
				message: "User-point issue list",
				data: issueList,
			});
		} catch (err) {
			return next(err);
		}
	},

	async issueInfo(req: Request, res: Response, next: NextFunction) {
		const { issueNo } = req.params;
		const issueNumber = parseInt(issueNo, 10);
		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { data } = await IssueServiceInstance.getIssueInfo(issueNumber);

			res.status(200).json({
				success: true,
				message: MSG.SUCCESS.ISSUE.LOOKUP,
				data: data, // TODO:
			});
		} catch (err) {
			return next(err);
		}
	},

	async createIssue(req: Request, res: Response, next: NextFunction) {
		try {
			const issueCreateReq: IssueCreateReq = {
				user: req.reqUser,
				issue: {
					title: req.body.title,
					class: parseInt(req.body.class),
					body: req.body.body,
					issueLoc: null,
					reportingLoc: {
						lat: new Decimal(req.body.lat),
						lng: new Decimal(req.body.lng),
					},
				},
				image: {
					originName: req.file.originalname,
					fileName: req.file.filename,
					class: null,
					location: null,
					src: null,
					createdAt: null,
				},
			};

			const IssueServiceInstance = Container.get(IssueService);
			const { createdIssueResult } = await IssueServiceInstance.createIssue(issueCreateReq);

			return res.status(200).json({
				success: true,
				message: MSG.SUCCESS.ISSUE.CREATE,
				data: null,
			});
		} catch (err) {
			return next(err);
		}
	},

	async solveIssue(req: Request, res: Response, next: NextFunction) {
		try {
			// const issueSolveReq: IssueSolveReq = {
			// 	user: req.reqUser,
			// 	body: req.body.body,
			// 	image: {
			// 		originName: req.file.originalname,
			// 		fileName: req.file.filename,
			// 	},
			// };

			// const IssueServiceInstance = Container.get(IssueService);
			// const { issueSolveResult } = await IssueServiceInstance.solveIssue(issueSolveReq);

			res.status(200).json({ success: true, message: MSG.SUCCESS.ISSUE.SOLVE, data: null });
		} catch (err) {
			return next(err);
		}
	},
};
