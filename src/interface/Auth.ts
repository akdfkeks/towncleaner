import { Request } from "express";

export interface LoginRequestBody extends Request {}

export interface JwtUserPayload {
	id: string;
	name: string;
}

export interface LoginRequest {
	id: string;
	pw: string;
}

export interface SignUpRequest {
	id: string;
	pw: string;
}

export interface ResponseMessage {
	success: boolean;
	message: string;
	data: any;
}

export interface RequestUser {
	id: string;
}
