import { ImageInfo, IssueContent, IssueCreateReq, IssueImageInfo } from "../interface/Issue";
import { Request } from "express";
import config from "../config";
import { InvalidDataError } from "../error/Error";
import { LatLng, UserAuthInfo } from "../interface/Issue";

export function issueListReqBodyParser(reqUser: UserAuthInfo, body: any) {
	try {
		const point: LatLng = {
			lat: parseFloat(body.lat),
			lng: parseFloat(body.lng),
		};

		return { user: reqUser, point };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}

export function issueCreateReqBodyParser(reqUser: UserAuthInfo, file: any, body: any) {
	try {
		const issue: IssueContent = {
			title: body.title,
			class: parseInt(body.class),
			body: body.body,
			userLocation: {
				lat: parseFloat(body.lat),
				lng: parseFloat(body.lng),
			},
		};
		const image: ImageInfo = {
			originName: file.originalname,
			fileName: file.filename,
		};
		return { user: reqUser, issue, image };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}

export function issueSolveReqBodyParser(reqUser: UserAuthInfo, file: any, body: any) {
	try {
		const issue = {
			body: body.body,
		};
		const image: ImageInfo = {
			originName: file.originalname,
			fileName: file.filename,
		};
		return { user: reqUser, issue, image };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}
