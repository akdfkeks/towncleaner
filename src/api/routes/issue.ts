import { Router } from "express";
import issueController from "../../api/routes/controller/issueController";
import { devAuth } from "../middlewares/jwtAuth";
import { saveFileToLocal } from "../middlewares/saveFile";

const route = Router();

export default (app: Router) => {
	app.use("/issue", route);

	route.use(function (req, res, next) {
		next();
	});

	route.post("/create", devAuth, saveFileToLocal.single("image"), issueController.createIssue);

	route.post("/:issueNo/solve", devAuth, issueController.solveIssue);

	route.get("/:issueNo", issueController.issueInfo);
	route.patch("/:issueNo", issueController.issueInfo);

	route.get("/", issueController.devIssueList);
	route.post("/", issueController.issueList);

	return app;
};
