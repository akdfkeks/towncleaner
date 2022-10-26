import { ImageInfo, IssueContent, IssueCreateReq, IssueImageInfo } from "../interface/Issue";
import { Request } from "express";
import config from "../config";
import { InvalidDataError } from "../error/Error";
import { LatLng, UserAuthInfo } from "../interface/Issue";

export function issueListReqParser(reqUser: UserAuthInfo, body: any) {
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

export function issueCreateReqParser(reqUser: UserAuthInfo, file: any, body: any) {
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
