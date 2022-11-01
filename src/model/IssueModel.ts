import prisma from "../config/prisma";
import { Service } from "typedi";
import { IssueCreateReq, Bound, LatLng } from "../interface/Issue";
import config from "../config";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { InternalServerError, PrismaClientError } from "../error/Error";

/**
 * 0.01 -> 1.1 km
 * 0.1	-> 11.1 km
 * 1.0	-> 111 km
 */
const LATRANGE = 0.5;
const LNGRANGE = 0.5;

@Service()
class IssueModel {
	constructor() {}

	async getIssueListByUserPoint(userLoc: LatLng) {
		try {
			const userBoundIssueList = await prisma.issue.findMany({
				where: {
					user_lat: {
						lte: userLoc.lat + LATRANGE, // max
						gte: userLoc.lat - LATRANGE, // min
					},
					user_lng: {
						lte: userLoc.lng + LNGRANGE, // max
						gte: userLoc.lng - LNGRANGE, // min
					},
					active: true,
					solved: false,
				},
				include: {
					Issue_img: {
						select: {
							src: true,
							lat: true,
							lng: true,
							detected_object: {
								include: {
									class: true,
								},
							},
						},
					},
				},
			});
			return userBoundIssueList;
		} catch (err) {
			throw new InternalServerError(err);
		}
	}

	async createIssue(issueRequest: IssueCreateReq) {
		const { user, issue } = issueRequest;
		try {
			const creationResult = await prisma.issue.create({
				data: {
					user: {
						connect: { id: user.id },
					},
					active: false,
					title: issue.title,
					//class: issue.,
					body: issueRequest.issue.body,
					user_lat: issue.userLoc.lat,
					user_lng: issue.userLoc.lng,
				},
			});

			return creationResult;
		} catch (err) {
			throw new InternalServerError(err);
		}
	}

	async getIssueInfo(issueId: number) {
		const issueInfo = await prisma.issue.findUnique({
			where: {
				id: issueId,
			},
		});
		return issueInfo;
	}
}

export default IssueModel;
