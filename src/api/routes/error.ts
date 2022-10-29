import { log } from "console";
import { Request, Response, NextFunction, Application, Router } from "express";
import { MSG } from "../../config/message";
import { AbstractExpectedError, NotFoundError } from "../../error/Error";

export default (app: Router) => {
	app.use((req, res, next: NextFunction) => next(new NotFoundError()));

	// Error Handler
	app.use((err, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof AbstractExpectedError) {
			const { message, statusCode, code } = err;
			res.status(statusCode || 500).json({ message, success: false });
		} else {
			console.log(err);
			res.status(500).json({ success: false, message: "Internal server error" });
		}
	});
	return app;
};
