import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import { Container } from "typedi";
import { IssueCreateReq, IssueInfo, IssueSolveReq } from "../../../interface/Issue";
import { IssueListReq } from "../../../interface/Issue";
import config from "../../../config";
import { MSG } from "../../../config/message";
import { issueCreateReqBodyParser, issueListReqBodyParser } from "../../../function/validate";

export default {
	// 미사용
	async devIssueList(req: Request, res: Response, next: NextFunction) {
		try {
			const IssueServiceInstance = Container.get(IssueService);
			const { issueList } = await IssueServiceInstance.getFixedPointIssues();

			res.status(200).json({
				success: true,
				message: "List of issues around the fixed point",
				data: issueList,
			});
		} catch (err) {
			return next(err);
		}
	},

	// 개발 완료
	async issueList(req: Request, res: Response, next: NextFunction) {
		try {
			const userPointIssueListReq: IssueListReq = issueListReqBodyParser(
				req.reqUser,
				req.body
			);
			console.log(`Request location : [ ${req.body.lat}, ${req.body.lng} ]`);
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
			const issueCreateReq: IssueCreateReq = issueCreateReqBodyParser(
				req.reqUser,
				req.file,
				req.body
			);

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
