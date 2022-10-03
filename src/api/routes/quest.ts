import { Router } from "express";
import questController from "./controller/questController";

const route = Router();

export default (app: Router) => {
	app.use("/quest", route);

	route.get("/", questController.list);
	// route.post("/login", questController);
	// route.post("/signup", questController);
};
