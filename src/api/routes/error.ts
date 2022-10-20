import { log } from "console";
import { Request, Response, NextFunction, Application, Router } from "express";
import { MSG } from "../../config/message";
import { AbstractExpectedError, NotFoundError } from "../../error/Error";

export default (app: Router) => {
	app.use((req, res, next) => {
		const err = new NotFoundError("Page not found");
		next(err);
	});

	// Error Handler
	app.use((err, req, res: Response, next: NextFunction) => {
		if (err instanceof AbstractExpectedError) {
			const { message, statusCode, code } = err;
			console.log(err);
			res.status(statusCode || 500).json({ message, code });
		} else {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		}
	});
	return app;
};
