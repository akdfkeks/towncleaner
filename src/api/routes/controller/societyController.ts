import { NextFunction, Request, Response } from "express";
import { PostListReq, PostCreateReq } from "../../../interface/Society";
import Container from "typedi";
import SocietyService from "../../../service/SocietyService";
import { postCreateReqBodyParser, postListReqBodyParser } from "../../../function/validate";

export default {
	async getQuestList(req: Request, res: Response, next: NextFunction) {
		const questListReq: PostListReq = postListReqBodyParser(req, "quest");

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questList = await SocietyServiceInstance.getPostList(questListReq);

			return res.status(200).json({ success: true, message: "Success", data: questList });
		} catch (err) {
			next(err);
		}
	},

	async createQuest(req: Request, res: Response, next: NextFunction) {
		const createQuestReq: PostCreateReq = postCreateReqBodyParser(req, "quest");

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questCreationResult = await SocietyServiceInstance.createPost(createQuestReq);

			return res.status(200).json({ success: true, message: "Success", data: null });
		} catch (err) {
			next(err);
		}
	},

	async getTradeList(req: Request, res: Response, next: NextFunction) {
		const tradeListReq: PostListReq = postListReqBodyParser(req, "trade");
		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const tradeList = await SocietyServiceInstance.getPostList(tradeListReq);

			return res.status(200).json({ success: true, message: "Success", data: tradeList });
		} catch (err) {
			next(err);
		}
	},

	async createTrade(req: Request, res: Response, next: NextFunction) {
		const createQuestReq: PostCreateReq = postCreateReqBodyParser(req, "trade");

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questCreationResult = await SocietyServiceInstance.createPost(createQuestReq);

			return res.status(200).json({ success: true, message: "Success", data: null });
		} catch (err) {
			next(err);
		}
	},
};
