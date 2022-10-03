import { NextFunction, Response } from "express";
import { LoginRequestBody } from "../../interface/Auth";
import passport from "passport";

function jwtAuth(req: LoginRequestBody, res: Response, next: NextFunction) {
	if (!req.headers.authorization) {
		req.body.user = null;
		req.body.authorization = false;
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

export default jwtAuth;
