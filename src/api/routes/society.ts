import { Router } from "express";
import society from "./controller/societyController";

const route = Router();

export default (app: Router) => {
	app.use("/society", route);

	route.get("/quest", society.getQuestList);
	route.post("/quest", society.createQuest);

	route.get("/trade", society.getTradeList);
	route.post("/trade", society.createTrade);

	return app;
};
