import { Request, Response } from "express";
import { RequestUser } from "./Auth";

export interface IssueListReq {
	user?: RequestUser;
	bound: Bound;
}

export interface Bound {
	sw: LatLng; // ⇙
	ne: LatLng; // ⇗
}

export interface IssueInfo {
	title?: string;
	body?: string;
	class?: number;
	location?: LatLng;
	imgUrl?: string;
}

export interface LatLng {
	lat: Number;
	lng: Number;
}

export interface UserRequest {
	user: RequestUser;
}

export interface IssueCreateReq {
	user: RequestUser;
	issue: IssueContent;
	fileName?: string;
}

export interface IssueContent {
	title?: string;
	class?: number;
	body?: string;
	img_loc?: LatLng;
	user_loc?: LatLng;
}

/**
 * 유저가 서버로 전송하는 정보
 * 1. 이미지 (필수)
 * 2. 제목
 * 3. 본문
 * 4. 클래스
 * 앱이 서버로 전송하는 정보
 * 1. 토큰 (인증 정보)
 * 2. 현재 위치
 */
