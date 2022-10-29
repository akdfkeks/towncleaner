import { ImageInfo, IssueContent, IssueCreateReq, IssueImageInfo } from "../interface/Issue";
import { Request } from "express";
import config from "../config";
import { InvalidDataError } from "../error/Error";
import { LatLng, UserAuthInfo } from "../interface/Issue";

export function issueListReqBodyParser(req: Request) {
	const { reqUser, body } = req;
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

export function issueCreateReqBodyParser(req: Request) {
	const { reqUser, file, body } = req;
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

export function postListReqBodyParser(req: Request, category: any) {
	try {
		const { reqUser } = req;
		const location = {
			lat: parseFloat(req.body.lat),
			lng: parseFloat(req.body.lng),
		};
		// const index = {
		// 	page: req.body.page,
		// 	lastPost: req.body.lastPost,
		// };

		return { user: reqUser, category, location };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}

export function postCreateReqBodyParser(req: Request, category: any) {
	try {
		const user = req.reqUser;
		const post = {
			title: req.body.title,
			body: req.body.body,
			category: category,
			price: parseInt(req.body.price),
			userLocation: {
				lat: parseFloat(req.body.lat),
				lng: parseFloat(req.body.lng),
			},
		};
		const image = {
			src: null,
			createdAt: null,
			location: null,
			originName: req.file.originalname,
			fileName: req.file.filename,
		};
		return { user, post, image };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}
