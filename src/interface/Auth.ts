import { Request } from "express";

export interface LoginRequestBody extends Request {}

interface JwtUserPayload {
	id: string;
	name: string;
}

export interface LoginForm {
	userId: string;
	userPw: string;
}

export interface SignUpForm {
	id: string;
	pw: string;
}

export interface LoginResult {
	success: boolean;
	message: string;
	data: any;
}
