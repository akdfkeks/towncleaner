import fs from "fs";
import storage from "../config/s3Config";
import config from "../config";
import { log } from "console";
import path from "path";
import prisma from "../config/prisma";
import { getLatLngFromImage } from "./exifParser";
import { LatLng } from "../interface/IssueTemp";

export async function uploadImageToS3(issueId: number, fileName: string, location: LatLng) {
	try {
		const fileContent: Buffer = fs.readFileSync(`uploads/${fileName}`);
		const params: { Bucket: string; Key: string; Body: Buffer } = {
			Bucket: config.bucketName,
			Key: fileName,
			Body: fileContent,
		};
		const uploadResult = await storage.upload(params).promise();
		console.log(uploadResult);
		const imageInfoCreateResult = await prisma.issue_img.create({
			data: {
				issue: {
					connect: { id: issueId },
				},
				org_name: "",
				src: uploadResult.Location,
				lat: location.lat,
				lng: location.lng,
			},
		});
	} catch (err) {
		log(err);
	}
}

export async function updateIssueImageClass() {}
