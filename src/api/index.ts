import { Router } from "express";
import auth from "./routes/auth";
import root from "./routes/root";

export default () => {
	const app = Router();

	root(app);
	auth(app);

	return app;
};
