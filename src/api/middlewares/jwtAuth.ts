import { NextFunction, Request, Response } from "express";
import { JwtUserPayload, LoginRequestBody } from "../../interface/Auth";
import jwt from "jsonwebtoken";
import config from "../../config";
import { PermissionError, AuthenticationError } from "../../error/Error";

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.signedCookies.valun) throw new PermissionError("로그인이 필요한 기능입니다.");

	// 토큰 추출 및 검증
	const userToken = req.signedCookies.valun;

	try {
		const decoded = jwt.verify(userToken, config.JWT_SECRET) as JwtUserPayload;
		req.reqUser = decoded;
		next();
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError)
			next(new AuthenticationError("토큰이 만료되었습니다."));
		if (err instanceof jwt.NotBeforeError)
			next(new AuthenticationError("유효하지 않은 토큰입니다."));
		if (err instanceof jwt.JsonWebTokenError) next(new AuthenticationError(err));
		next(err);
	}
}

// ------------------------isDev------------------------
export const devJwtAuth = (req: Request, res: Response, next: NextFunction) => {
	if (config.isDev) {
		req.reqUser = { id: "test1", name: "dev" };
	}
	next();
};
// ------------------------isDev------------------------
