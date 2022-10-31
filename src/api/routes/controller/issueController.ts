import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import { Container } from "typedi";
import { IssueCreateReq } from "../../../interface/Issue";
import { IssueListReq } from "../../../interface/Issue";
import config from "../../../config";
import { MSG } from "../../../config/message";
import { issueCreateReqParser, issueListReqParser } from "../../../function/inputParser";

export default {
	// dev api
	async devIssueList(req: Request, res: Response, next: NextFunction) {
		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { issueList } = await IssueServiceInstance.getFixedPointIssueList();

			res.status(200).json({
				success: true,
				message: MSG.SUCCESS.ISSUE.LOOKUP_LIST,
				data: issueList,
			});
		} catch (err) {
			return next(err);
		}
	},

	async getIssueList(req: Request, res: Response, next: NextFunction) {
		try {
			const userPointIssueListReq: IssueListReq = issueListReqParser(req);

			const IssueServiceInstance = Container.get(IssueService);
			const { issueList } = await IssueServiceInstance.getUserPointIssueList(
				userPointIssueListReq
			);

			res.status(200).json({
				success: true,
				message: MSG.SUCCESS.ISSUE.LOOKUP_LIST,
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
			const issueCreateReq: IssueCreateReq = issueCreateReqParser(req);

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

	// async solveIssue(req: Request, res: Response, next: NextFunction) {
	// 	try {
	// 		const issueSolveReq: IssueSolveReq = issueSolveReqParser(
	// 			req.reqUser,
	// 			req.file,
	// 			req.body
	// 		);

	// 		const IssueServiceInstance = Container.get(IssueService);
	// 		const { issueSolveResult } = await IssueServiceInstance.solveIssue(issueSolveReq);

	// 		res.status(200).json({
	// 			success: true,
	// 			message: MSG.SUCCESS.ISSUE.SOLVE_TRY,
	// 			data: null,
	// 		});
	// 	} catch (err) {
	// 		return next(err);
	// 	}
	// },
};
