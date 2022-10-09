import { Router } from "express";
import auth from "./routes/auth";
import issue from "./routes/issue";
import quest from "./routes/quest";
import error from "./routes/error";
import test from "./routes/test";
import log from "./routes/log";

export default () => {
	const app = Router();

	log(app);
	auth(app);
	issue(app);
	quest(app);
	//deal(app)
	test(app);
	error(app);

	return app;
};
