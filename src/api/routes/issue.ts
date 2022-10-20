import { Router } from "express";
import issueController from "../../api/routes/controller/issueController";
import { devAuth } from "../middlewares/jwtAuth";
import { saveFileToLocal } from "../middlewares/saveFile";

const route = Router();

export default (app: Router) => {
	app.use("/issue", route);

	route.use(function (req, res, next) {
		console.log(req.ip);
		next();
	});

	route.post("/create", devAuth, saveFileToLocal.single("image"), issueController.createIssue);
	//route.post("/create", devAuth, saveFile, issueController.createIssue);

	route.post("/:issueNo/solve", devAuth, issueController.solveIssue);

	route.get("/:issueNo", issueController.issueInfo);
	route.patch("/:issueNo", issueController.issueInfo);

	route.get("/", issueController.devIssueList);
	route.post("/", issueController.issueList);

	return app;
};

/**
 * 이슈는 생성 조회 수정 삭제 해결 이 가능하다
 * , IssueImageUploader.single("img")
 */
