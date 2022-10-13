import prisma from "../config/prisma";
import Container from "typedi";

class ImageModel {
	constructor() {}

	async createIssueImage() {}
}

Container.set("IssueModel", new ImageModel());

export default ImageModel;
