import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import Container from "typedi";
import { IssueCreateReq, IssueSolveReq } from "../../../interface/IssueTemp";
import { IssueListReq } from "../../../interface/IssueTemp";
import config from "../../../config";
import { MSG } from "../../../config/message";
import { Decimal } from "@prisma/client/runtime";

export default {
	async devIssueList(req: Request, res: Response) {
		const IssueServiceInstance = Container.get(IssueService);
		const { data } = await IssueServiceInstance.getFixedPointIssues();

		res.status(200).json({
			success: true,
			message: "List of issues around the fixed point",
			data: data,
		});
	},

	async issueList(req: Request, res: Response, next: NextFunction) {
		// ------------------------isDev------------------------
		if (config.isDev) {
			req.reqUser = { id: "test1", name: "dev" };
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
		const issueNumber = parseInt(issueNo, 10);
		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { data } = await IssueServiceInstance.getIssueInfo(issueNumber);

			res.status(200).json({
				success: true,
				message: MSG.SUCCESS.ISSUE.LOOKUP,
				data: data, // TODO:
			});
		} catch (e) {
			next(e);
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
			const { createdIssue } = await IssueServiceInstance.createIssue(issueCreateReq);

			if (!createdIssue) throw new Error(MSG.FAILURE.ISSUE.CREATE);

			return res.status(200).json({
				success: true,
				message: MSG.SUCCESS.ISSUE.CREATE,
				data: null, // 굳이 객체를 안보내줘도 될듯?
			});
			//
		} catch (e) {
			next(e);
		}
	},

	async solveIssue(req: Request, res: Response) {
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
		} catch (e) {}
	},
};
