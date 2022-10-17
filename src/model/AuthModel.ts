import prisma from "../config/prisma";
import { LoginRequest, SignUpRequest } from "../interface/Auth";
import Container, { Service } from "typedi";

class AuthModel {
	constructor() {}

	async signUp(userData: SignUpRequest) {
		const signUpResult = await prisma.user.create({
			data: {
				id: userData.id,
				pw: userData.pw,
			},
		});
		if (signUpResult) {
			return signUpResult;
		} else throw new Error("Fail to create account");
	}

	async getUserData(loginForm: LoginRequest) {
		const user = await prisma.user.findUnique({
			where: {
				id: loginForm.id,
			},
			select: {
				id: true,
				pw: true,
			},
		});
		return user;
	}

	async getUserExist(user: SignUpRequest) {
		const isExist = await prisma.user.count({ where: { id: user.id } });
		return isExist;
	}
}

export default AuthModel;
