import { Container } from "typedi";
import prisma from "@/loader/prisma";
import UserSignUp from "@/interface/SignUpUser";

class UserModel {
	constructor() {}

	async signUp(userData: UserSignUp) {
		const signUpResult = await prisma.user.create({
			data: {
				id: userData.id,
				pw: userData.pw,
				salt: "tempSalt",
			},
		});
		if (signUpResult) {
			return signUpResult;
		}
	}
}

Container.set("UserModel", new UserModel());

export default UserModel;
