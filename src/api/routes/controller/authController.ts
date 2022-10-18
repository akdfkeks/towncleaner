import { LoginRequest, SignUpRequest } from "../../../interface/Auth";
import { Request, Response, NextFunction } from "express";
import AuthService from "../../../service/AuthService";
import { Container } from "typedi";

export default {
	async login(req: Request, res: Response, next: NextFunction) {
		const loginRequest: LoginRequest = {
			id: req.body.user.id,
			pw: req.body.user.pw,
		};
		try {
			const authServiceInstance = Container.get(AuthService);
			const { token } = await authServiceInstance.localLogin(loginRequest);

			res.status(200).json({
				success: true,
				message: "Login Succeed",
				data: { token },
			});
		} catch (e) {
			next(e);
		}
	},

	async signup(req: Request, res: Response, next: NextFunction) {
		const signupRequest: SignUpRequest = {
			id: req.body.user.id,
			pw: req.body.user.pw,
		};
		try {
			const authServiceInstance = Container.get(AuthService);
			const { signUpResult } = await authServiceInstance.signUp(signupRequest);

			res.status(200).json({ success: true, message: "Signup Success", data: {} });
		} catch (e) {
			next(e);
		}
	},
};
