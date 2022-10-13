import { NextFunction, Request, Response } from "express";
import { LoginRequestBody } from "../../interface/Auth";
import passport from "passport";
import config from "../../config";

export function jwtAuth(req: LoginRequestBody, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		req.reqUser = null;
		next();
	}
	return passport.authenticate("jwt", { session: false }, (err, jwtPayload) => {
		if (err || !jwtPayload) {
			req.body.user = null;
			req.body.authorization = false;
		} else {
			req.body.user = jwtPayload;
			req.body.authorization = true;
		}
		next();
	})(req, res, next);
}

// ------------------------isDev------------------------
export const devAuth = (req: Request, res: Response, next: NextFunction) => {
	if (config.isDev) {
		req.reqUser = { id: "test1" };
	}
	next();
};
// ------------------------isDev------------------------
