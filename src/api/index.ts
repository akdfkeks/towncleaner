import { Router } from "express";
import auth from "./routes/auth";
import issue from "./routes/issue";
import society from "./routes/society";
import error from "./routes/error";
import test from "./routes/test";
import log from "./routes/log";

export default () => {
	const app = Router();

	auth(app);
	issue(app);
	society(app);
	test(app);
	log(app);
	error(app);

	return app;
};
