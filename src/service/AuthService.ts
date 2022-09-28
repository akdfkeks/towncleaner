import { Inject, Service } from "typedi";
import UserModel from "@/model/UserModel";
import SignUpUser from "@/interface/SignUpUser";

@Service()
class AuthService {
	constructor(@Inject("UserModel") private userModel: UserModel) {}

	public async signUp(user: SignUpUser) {
		const result = await this.userModel.signUp(user);
	}
	async localLogin() {}
	async jwtAuth() {}
}

export default AuthService;
