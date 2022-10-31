import { NextFunction, Request, Response } from "express";
import { PostListReq, PostCreateReq } from "../../../interface/Society";
import Container from "typedi";
import SocietyService from "../../../service/SocietyService";
import { postCreateReqParser, postListReqParser } from "../../../function/inputParser";

export default {
	async getQuestList(req: Request, res: Response, next: NextFunction) {
		const questListReq: PostListReq = postListReqParser(req, "quest");

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questList = await SocietyServiceInstance.getPostList(questListReq);

			return res.status(200).json({ success: true, message: "Success", data: questList });
		} catch (err) {
			next(err);
		}
	},

	async createQuest(req: Request, res: Response, next: NextFunction) {
		const createQuestReq: PostCreateReq = postCreateReqParser(req, "quest");

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questCreationResult = await SocietyServiceInstance.createPost(createQuestReq);

			return res.status(200).json({ success: true, message: "Success", data: null });
		} catch (err) {
			next(err);
		}
	},

	async getTradeList(req: Request, res: Response, next: NextFunction) {
		const tradeListReq: PostListReq = postListReqParser(req, "trade");
		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const tradeList = await SocietyServiceInstance.getPostList(tradeListReq);

			return res.status(200).json({ success: true, message: "Success", data: tradeList });
		} catch (err) {
			next(err);
		}
	},

	async createTrade(req: Request, res: Response, next: NextFunction) {
		const createQuestReq: PostCreateReq = postCreateReqParser(req, "trade");

		try {
			const SocietyServiceInstance = Container.get(SocietyService);
			const questCreationResult = await SocietyServiceInstance.createPost(createQuestReq);

			return res.status(200).json({ success: true, message: "Success", data: null });
		} catch (err) {
			next(err);
		}
	},
};
