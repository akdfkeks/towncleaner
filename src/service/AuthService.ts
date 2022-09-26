/**
 * import DTO, Model 등등
 */

import { Service } from "typedi";
import userModel from "@/model/userModel";

@Service()
class AuthService {
	userModel: userModel;

	constructor(userModel) {
		this.userModel = userModel;
	}

	async signUp() {}
	async localLogin() {}
	async jwtAuth() {}
}

export default AuthService;
