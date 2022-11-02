import axios from "axios";
import { sortResultByBboxWithConf, tempData } from "./detectionResultParser";
import prisma from "../config/prisma";
import { Result } from "../interface/Detection";
import path from "path";
import { categoryClassifier } from "./categoryClassifier";

export async function toYolo(fileName: string, issueId: number, imageId: number, src: string) {
	const YOLO_ADDRESS = "192.168.0.25:3000";
	try {
		const detectionResult = await axios.post(`http://${YOLO_ADDRESS}/detect`, {
			fileName,
			src,
		});
		//------------forDev------------------
		// const detectionResult = {
		// 	data: tempData,
		// };

		if (detectionResult.data.length > 0) {
			const sortResult = sortResultByBboxWithConf(detectionResult.data);

			const updateResult = await Promise.all([
				await prisma.issue_image.update({
					where: { id: imageId },
					data: {
						detected_object: {
							createMany: {
								data: (function () {
									const list = sortResult.map((data: Result) => {
										return {
											// class id 는 1부터 시작함
											class_id: data.code,
											confidence: data.conf,
											bounding_size: data.size,
										};
									});
									console.log(list);
									return list;
								})(),
							},
						},
					},
				}),
				await prisma.issue.update({
					where: { id: issueId },
					data: {
						active: true,
						class: categoryClassifier(sortResult[0].code),
					},
				}),
			]);
			const updateBroomResult = await prisma.user.update({
				where: { id: updateResult[1].user_id },
				data: { broom: { increment: 500 } },
			});
		}
	} catch (err) {
		console.log(err);
		throw err;
	}
}
