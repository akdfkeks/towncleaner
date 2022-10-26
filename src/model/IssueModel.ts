import prisma from "../config/prisma";
import { Service } from "typedi";
import { IssueCreateReq, Bound, LatLng } from "../interface/Issue";
import config from "../config";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { PrismaClientError } from "../error/Error";

/**
 * 0.01 -> 1.1 km
 * 0.1	-> 11.1 km
 * 1.0	-> 111 km
 */
const LATRANGE = 0.2;
const LNGRANGE = 0.2;

@Service()
class IssueModel {
	constructor() {}

	async getIssueListByUserPoint(userPoint: LatLng) {
		const userBoundIssueList = await prisma.issue.findMany({
			where: {
				user_lat: {
					lte: userPoint.lat + LATRANGE, // max
					gte: userPoint.lat - LATRANGE, // min
				},
				user_lng: {
					lte: userPoint.lng + LNGRANGE, // max
					gte: userPoint.lng - LNGRANGE, // min
				},
				active: true,
				solved: false,
			},

			select: {
				id: true,
				user_id: true,
				solved: true,
				title: true,
				class: true,
				body: true,
				created_at: true,
				user_lat: true,
				user_lng: true,
				Issue_img: true,
			},
		});

		return userBoundIssueList;
	}

	async createIssue(issueRequest: IssueCreateReq) {
		const { user, issue, image } = issueRequest;
		try {
			const creationResult = await prisma.issue.create({
				data: {
					user: {
						connect: { id: user.id },
					},
					active: config.isDev,
					title: issue.title,
					class: issue.class,
					body: issueRequest.issue.body,
					user_lat: issue.userLocation.lat,
					user_lng: issue.userLocation.lng,
				},
			});

			return creationResult;
		} catch (err) {
			if (
				err instanceof PrismaClientValidationError ||
				err instanceof PrismaClientKnownRequestError
			) {
				throw new PrismaClientError(err);
			}
			throw err;
		}
	}

	async getIssueInfo(issueId: number) {
		const issueInfo = await prisma.issue.findUnique({
			where: {
				id: issueId,
			},
		});
	}
}

export default IssueModel;
