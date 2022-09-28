import { Router } from "express";
import issueController from "@/api/routes/controller/issueController";

const route = Router();

export default (app: Router) => {
	app.use("/issue", route);

	route.get("/", issueController.fixedPoint);
	route.post("/", issueController.userPoint);

	route.get("/:issueNo", issueController.issueInfo);

	route.post("/solve", issueController.solveIssue);
};

/**
 * 이슈는 생성 조회 수정 삭제 해결 이 가능하다
 */
