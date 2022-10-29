import { Router } from "express";
import issueController from "../../api/routes/controller/issueController";
import { devJwtAuth, jwtAuth } from "../middlewares/jwtAuth";
import { saveFileToLocal } from "../middlewares/saveFile";

const route = Router();

export default (app: Router) => {
	app.use("/issue", route);

	route.use(function (req, res, next) {
		next();
	});

	route.post("/asdf", jwtAuth, (req, res, next) => {
		try {
			res.status(200).json({ id: req.reqUser.id });
		} catch (err) {
			next(err);
		}
	});
	route.post("/create", devJwtAuth, saveFileToLocal.single("image"), issueController.createIssue);

	route.post("/:issueNo/solve", devJwtAuth, issueController.solveIssue);

	route.get("/:issueNo", issueController.issueInfo);
	route.patch("/:issueNo", issueController.issueInfo);

	route.get("/", issueController.devIssueList);
	route.post("/", issueController.issueList);

	return app;
};
