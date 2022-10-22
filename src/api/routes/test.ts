import { Router } from "express";
import questController from "./controller/societyController";
import test from "./controller/testController";
import { multerUpload } from "./controller/testController";
const route = Router();

export default (app: Router) => {
	app.use("/test", route);

	route.use("/msg", (req, res) => {
		console.log(req.body);
	});

	return app;
};
