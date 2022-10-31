import { spawn } from "child_process";
import { log } from "console";
import path from "path";
import prisma from "../config/prisma";
import { toYolo } from "./toYolo";

export async function detectObject(
	fileName: string,
	issueId: number,
	imageId: number,
	src?: string
) {
	try {
		//toChild(fileName, issueId, imageId);
		toYolo(fileName, issueId, imageId, src);
	} catch (err) {
		log(err);
	}
}
/**
 https://bb-library.tistory.com/214
 */

function toChild(fileName: string, issueId: number, imageId: number) {
	const __dirname = path.resolve();
	const child = spawn("python3", [`${__dirname}/app.py"`, fileName]);
	child.stdout.on("data", async (data) => {
		const imageClass = (() => {
			const subClass = parseInt(data.toString());
			if (subClass <= 4) return 0;
			if (subClass <= 9) return 1;
			if (subClass <= 14) return 2;
			if (subClass <= 19) return 3;
			if (subClass <= 24) return 4;
		})();

		const result = await Promise.all([
			await prisma.issue.update({
				where: { id: issueId },
				data: {
					class: imageClass,
				},
			}),
			await prisma.issue_image.update({
				where: { id: imageId },
				data: {
					// Detected_obj : {
					// 	connectOrCreate : {
					// 	}
					// }
				},
			}),
		]);

		// If process done
		child.kill();
	});
}
