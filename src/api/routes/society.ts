import { Router } from "express";
import society from "./controller/societyController";
import { saveFileToLocal } from "../middlewares/saveFile";
import { devJwtAuth } from "../middlewares/jwtAuth";

const route = Router();

export default (app: Router) => {
	app.use("/society", devJwtAuth, route);

	route.get("/quest", society.getQuestList);
	route.post("/quest", saveFileToLocal.single("image"), society.createQuest);

	route.get("/trade", society.getTradeList);
	route.post("/trade", saveFileToLocal.single("image"), society.createTrade);

	return app;
};
