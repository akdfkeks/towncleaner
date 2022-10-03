import prisma from "@/loader/prisma";
import { LoginForm, SignUpForm } from "@/interface/Auth";
import Container from "typedi";

class AuthModel {
	constructor() {}

	async signUp(userData: SignUpForm) {
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

	async getUserData(loginForm: LoginForm) {
		const user = await prisma.user.findUnique({
			where: {
				id: loginForm.userId,
			},
			select: {
				id: true,
				pw: true,
			},
		});
		return user;
	}

	async getUserExist(user: SignUpForm) {
		const isExist = await prisma.user.count({ where: { id: user.id } });
		return isExist;
	}
}

Container.set("AuthModel", new AuthModel());

export default AuthModel;
