import { Request } from "express";
import { Contents, Image, IssueCreateReq, IssueListReq, LatLng } from "../interface/Issue";
import { Post, PostCreateReq, PostListReq } from "../interface/Society";
import { InvalidDataError } from "../error/Error";

// Done
export function issueListReqParser(req: Request): IssueListReq {
	const { reqUser, body } = req;
	try {
		const location: LatLng = {
			lat: parseFloat(body.lat),
			lng: parseFloat(body.lng),
		};
		if (location.lng > 132 || location.lng < 123)
			throw new Error("올바르지 않은 위치 데이터입니다.");
		if (location.lat > 43 || location.lat < 33)
			throw new Error("올바르지 않은 위치 데이터입니다.");
		return { user: reqUser, location };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}

// Done
export function issueCreateReqParser(req: Request): IssueCreateReq {
	const { reqUser, file, body } = req;
	try {
		const contents: Contents = {
			category: body.category,
			code: body.class,
			title: body.title,
			body: body.body,
			userLoc: { lat: parseFloat(body.lat), lng: parseFloat(body.lng) },
		};

		const image: Image = {
			originName: file.originalname,
			fileName: file.filename,
		};

		return { user: reqUser, issue: contents, image };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}

// Done
export function postListReqParser(req: Request, category: "quest" | "trade"): PostListReq {
	const { reqUser, body } = req;
	try {
		const location = {
			lat: parseFloat(body.lat),
			lng: parseFloat(body.lng),
		};

		return { user: reqUser, category, location };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}

// Done
export function postCreateReqParser(req: Request, category: "quest" | "trade"): PostCreateReq {
	const { reqUser, file, body } = req;
	try {
		const post: Post = {
			title: body.title,
			category: category,
			body: body.body,
			price: Math.abs(parseInt(body.price)),
			userLoc: {
				lat: parseFloat(body.lat),
				lng: parseFloat(body.lng),
			},
		};

		const image: Image = {
			originName: file.originalname,
			fileName: file.filename,
		};

		return { user: reqUser, post, image };
	} catch (err) {
		throw new InvalidDataError(err);
	}
}
