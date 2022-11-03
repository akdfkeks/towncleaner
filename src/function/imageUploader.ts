import fs from "fs";
import storage from "../config/s3Config";
import config from "../config";
import { log } from "console";
import prisma from "../config/prisma";
import { LatLng } from "../interface/Issue";
import { detectObject } from "./childWorker";
import sharp from "sharp";
import { compressImage } from "./imageCompressor";

export async function s3Uploader(fileName: string) {
	const fileData: Buffer = fs.readFileSync(`uploads/comp/${fileName}`);
	const params: { Bucket: string; Key: string; Body: Buffer } = {
		Bucket: config.bucketName,
		Key: fileName,
		Body: fileData,
	};
	const uploadResult = await storage.upload(params).promise();
	console.log(uploadResult);
	return { src: uploadResult.Location };
}

export async function issueImageHandler(
	issueId: number,
	fileName: string,
	originName: string,
	location: LatLng
) {
	try {
		const compResult = await compressImage(fileName, 1920);
		const uploadResult = await s3Uploader(fileName);
		const issueImageInfoCreateResult = await prisma.issue_image.create({
			data: {
				issue: {
					connect: { id: issueId },
				},
				org_name: originName,
				src: uploadResult.src,
				lat: location.lat,
				lng: location.lng,
			},
		});

		// 2. 이미지 물체 감지
		detectObject(fileName, issueId, issueImageInfoCreateResult.id, uploadResult.src);
	} catch (err) {
		log(err);
		throw err;
	}
}

export async function postImageHandler(postId: number, fileName: string, originName: string) {
	try {
		const compResult = await compressImage(fileName, 1920);
		const uploadResult = await s3Uploader(fileName);
		const postImageInfoCreateResult = await prisma.post_image.create({
			data: {
				post: {
					connect: {
						id: postId,
					},
				},
				src: uploadResult.src,
				org_name: originName,
			},
		});
		await prisma.post.update({
			where: { id: postId },
			data: {
				active: true,
			},
		});
	} catch (err) {
		log(err);
		throw err;
	}
}
