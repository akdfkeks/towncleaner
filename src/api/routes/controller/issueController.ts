import { Request, Response, NextFunction } from "express";
import IssueService from "../../../service/IssueService";
import ImageService from "../../../service/ImageService";
import Container from "typedi";
import { IssueCreateReq, IssueListReq } from "../../../interface/Issue";
import config from "../../../config";
import { MSG } from "../../../config/message";

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
			req.reqUser = { id: "test1" };
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
			user: { id: req.reqUser.id },
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
		// Image 는 multer 가 로컬에 저장함
		const issueCreateReq: IssueCreateReq = {
			user: req.reqUser,
			issue: {
				title: req.body.title,
				class: parseInt(req.body.class),
				body: req.body.body,
				user_loc: {
					lat: req.body.lat,
					lng: req.body.lng,
				},
			},
			fileName: req.file.filename,
		};

		try {
			const IssueServiceInstance = Container.get(IssueService);
			const ImageServiceInstance = Container.get(ImageService);
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

	async solveIssue(req: Request, res: Response) {},
};
