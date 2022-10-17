import prisma from "../config/prisma";
import Container, { Service } from "typedi";
import { IssueImageInfo } from "../interface/IssueTemp";
import fs from "fs";
import storage from "../config/s3Config";
import config from "../config";
import { log } from "console";
import path from "path";

@Service()
class ImageModel {
	constructor() {}

	async createIssueImage(issueId: number, imageInfo: IssueImageInfo) {}

	async uploadImageToS3(fileName: string) {
		try {
			const fileContent: Buffer = fs.readFileSync(
				path.join(__dirname, `../../uploads/${fileName}`)
			);

			const params: { Bucket: string; Key: string; Body: Buffer } = {
				Bucket: config.bucketName,
				Key: fileName,
				Body: fileContent,
			};

			const result = await storage.upload(params).promise();
			if (!result) throw new Error("File upload failed");
		} catch (err) {
			log(err);
		}
	}
}

export default ImageModel;
