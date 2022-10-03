import { Request, Response, NextFunction, Application, Router } from "express";

export default (app: Router) => {
	app.use((req, res, next) => {
		const err = new Error("Not Found");
		err["status"] = 404;
		next(err);
	});

	// Error Handler
	app.use((err, req, res: Response, next: NextFunction) => {
		/**
		 * Handle 401 thrown by express-jwt library
		 */
		if (err.name === "UnauthorizedError") {
			return res.status(err.status).json({ success: false, message: err.message });
		}
		return next(err);
	});
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.json({
			success: false,
			errors: {
				message: err.message,
			},
		});
	});
};
