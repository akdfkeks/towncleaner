import { Request, Response } from "express";
import { RequestUser } from "./Auth";

export interface UserBoundIssuesReq {
	user: RequestUser;
	bound: UserBound;
}

export interface UserBound {
	sw: LatLng;
	ne: LatLng;
}

export interface Issue {
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

export interface IssueCreateReq {
	user: RequestUser;
	issue: IssueContent;
	file?: any;
}

export interface IssueContent {
	title?: string;
	class?: number;
	body?: string;
	location?: LatLng;
}
