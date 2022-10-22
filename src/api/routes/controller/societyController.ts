import { NextFunction, Request, Response } from "express";
import { PostListReq, PostCreateReq } from "../../../interface/Society";
import Container from "typedi";
import SocietyService from "../../../service/SocietyService";

export default {
	async getQuestList(req: Request, res: Response, next: NextFunction) {
		const questListReq: PostListReq = {
			user: req.reqUser,
			category: "quest",
			index: {
				page: req.body.page,
				lastPost: req.body.lastPost,
			},
		};

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questList = await SocietyServiceInstance.getPostList(questListReq);

			return res.status(200).json({ success: true, message: "Success", data: questList });
		} catch (err) {
			next(err);
		}
	},

	async createQuest(req: Request, res: Response, next: NextFunction) {
		const createQuestReq: PostCreateReq = {
			user: req.reqUser,
			post: {
				category: "quest",
				title: req.body.title,
				body: req.body.body,
				price: parseInt(req.body.price),
			},
		};
		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questCreationResult = await SocietyServiceInstance.createPost(createQuestReq);

			return res.status(200).json({ success: true, message: "Success", data: null });
		} catch (err) {
			next(err);
		}
	},

	async getTradeList(req: Request, res: Response, next: NextFunction) {
		const tradeListReq: PostListReq = {
			user: req.reqUser,
			category: "trade",
			index: {
				page: req.body.page,
				lastPost: req.body.lastPost,
			},
		};
		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const tradeList = await SocietyServiceInstance.getPostList(tradeListReq);

			return res.status(200).json({ success: true, message: "Success", data: tradeList });
		} catch (err) {
			next(err);
		}
	},

	async createTrade(req: Request, res: Response, next: NextFunction) {
		const createQuestReq: PostCreateReq = {
			user: req.reqUser,
			post: {
				category: "trade",
				title: req.body.title,
				body: req.body.body,
				price: parseInt(req.body.price),
			},
		};
		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questCreationResult = await SocietyServiceInstance.createPost(createQuestReq);

			return res.status(200).json({ success: true, message: "Success", data: null });
		} catch (err) {
			next(err);
		}
	},
};
