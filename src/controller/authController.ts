import LoginDto from "@/dto/LoginDto";
import { Request, Response, NextFunction } from "express";

/**
 * body 로부터 데이터를 분리하여 DTO 에 담은 후
 * 서비스 계층에 DTO 를 그대로 전달한다.
 * ex)
 * const userDTO = req.body.user;
 * const {user, company} = await UserService.Signup(userDTO);
 * return res.json({user, company});
 */
export default {
	async login(req: Request, res: Response) {
		const loginDTO: LoginDto = {
			id: req.body.user.id,
			pw: req.body.user.pw,
		};
	},
	async signup(req: Request, res: Response) {},
};
