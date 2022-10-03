import { Request, Response } from "express";

export default {
	async list(req: Request, res: Response) {
		const page = req.query.page;
	},
};
