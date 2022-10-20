import { Router } from "express";

const route = Router();

export default (app: Router) => {
	app.use("/", route);

	route.get("/log", (req, res, next) => {
		console.log(`Request Body : ${req.body}`);
	});

	return app;
};
