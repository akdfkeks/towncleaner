import { Router } from "express";
import authController from "../../controller/authController";
import Container from "typedi";
import AuthService from "../../service/AuthService";

const route = Router();

export default (app: Router) => {
	app.use("/auth", route);

	route.get("/", async (req, res) => {});
	route.post("/login", authController.login);
	route.post("/signup", authController.signup);
};
