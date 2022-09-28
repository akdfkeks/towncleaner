import { Router } from "express";
import authController from "./controller/authController";

const route = Router();

export default (app: Router) => {
	app.use("/auth", route);

	route.get("/", async (req, res) => {});
	route.post("/login", authController.login);
	route.post("/signup", authController.signup);
};
