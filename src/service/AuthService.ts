import { Inject, Service } from "typedi";
import AuthModel from "../model/AuthModel";
import { SignUpRequest } from "../interface/Auth";
import { LoginRequest, ResponseMessage } from "../interface/Auth";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

@Service()
class AuthService {
	@Inject("AuthModel") private authModel: AuthModel;

	public async signUp(user: SignUpRequest) {
		// 아이디 사용 여부 확인
		const userExist = await this.authModel.getUserExist(user);
		if (userExist) throw new Error("User already Exist");

		// 비밀번호 해싱 및 DB 저장할 데이터 형식 생성
		const hashedPw = await argon2.hash(user.pw, { type: argon2.argon2i });
		const signUpData: SignUpRequest = {
			id: user.id,
			pw: hashedPw,
		};

		// DB 에 데이터 넘기기
		const signUpResult = await this.authModel.signUp(signUpData);
		if (!signUpResult) throw new Error("SignUp Failed");

		return { signUpResult };
	}

	async localLogin(loginRequest: LoginRequest) {
		const userData = await this.authModel.getUserData(loginRequest);
		if (!userData) {
			throw new Error("User not Exist");
		}

		const pwVerification = await argon2.verify(userData.pw, loginRequest.id, {
			type: argon2.argon2i,
		});
		if (!pwVerification) {
			throw new Error("Invaild Password");
		}

		const payload = {
			userId: userData.id,
		};

		const generatedToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "2h",
			issuer: "towncleaner",
		});

		return { token: generatedToken };
	}
}

export default AuthService;
