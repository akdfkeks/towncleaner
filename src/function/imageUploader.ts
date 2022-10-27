import fs from "fs";
import storage from "../config/s3Config";
import config from "../config";
import { log } from "console";
import prisma from "../config/prisma";
import { LatLng } from "../interface/Issue";
import { detectObject } from "./childWorker";
import axios from "axios";

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

		// 3. AI 서버로 요청
		const detectionResult = await axios
			.post("니집아이피/detect", { url: uploadResult.Location })
			.catch((err) => {});
		//console.log(detectionResult.data);
	} catch (err) {
		log(err);
		throw err;
	}
}

export async function updateIssueImageClass() {}
