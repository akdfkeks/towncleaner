import { Router } from "express";
import auth from "./routes/auth";
import issue from "./routes/issue";
import quest from "./routes/quest";
import error from "./routes/error";

export default () => {
	const app = Router();

	auth(app);
	issue(app);
	quest(app);
	//deal(app)
	error(app);

	return app;
};
