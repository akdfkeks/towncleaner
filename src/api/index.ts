import { Router } from "express";
import auth from "./routes/auth";
import issue from "./routes/issue";

export default () => {
	const app = Router();

	issue(app);
	auth(app);

	return app;
};
