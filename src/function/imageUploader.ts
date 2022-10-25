import fs from "fs";
import storage from "../config/s3Config";
import config from "../config";
import { log } from "console";
import prisma from "../config/prisma";
import { LatLng } from "../interface/IssueTemp";
import { detectObject } from "./childWorker";

export async function processImage(issueId: number, fileName: string, location: LatLng) {
	try {
		// 1. 이미지 업로드
		const fileContent: Buffer = fs.readFileSync(`uploads/${fileName}`);
		const params: { Bucket: string; Key: string; Body: Buffer } = {
			Bucket: config.bucketName,
			Key: fileName,
			Body: fileContent,
		};
		const uploadResult = await storage.upload(params).promise();
		console.log(uploadResult);
		const imageInfoCreateResult = await prisma.issue_image.create({
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

		// 2. 이미지 물체 감지
		detectObject(fileName, issueId, imageInfoCreateResult.id);
	} catch (err) {
		log(err);
	}
}

export async function updateIssueImageClass() {}
