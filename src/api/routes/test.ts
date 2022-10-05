import { Router } from "express";
import questController from "./controller/questController";
import test from "./controller/testController";
import { multerUpload } from "./controller/testController";
const route = Router();

export default (app: Router) => {
	app.use("/test", route);

	route.post("/", multerUpload.single("img"), test);
	// route.post("/login", questController);
	// route.post("/signup", questController);
};
