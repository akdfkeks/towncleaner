import prisma from "../config/prisma";
import Container from "typedi";
import { IssueImageInfo } from "../interface/IssueTemp";

class ImageModel {
	constructor() {}

	async createIssueImage(issueId: number, imageInfo: IssueImageInfo) {
		const result = prisma.issue_img.create({
			data: {
				issue: {
					connect: {
						id: issueId,
					},
				},
				org_name: imageInfo.originName,
				lat: imageInfo.location.lat,
				lng: imageInfo.location.lng,
			},
		});
		return result;
	}
}

Container.set("IssueModel", new ImageModel());

export default ImageModel;
