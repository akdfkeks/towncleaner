import { spawn } from "child_process";
import { log } from "console";
import path from "path";
import prisma from "../config/prisma";

export async function detectObject(fileName: string, issueId: number, imageId: number) {
	const __dirname = path.resolve();
	try {
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
			// console.log(data.toString());
			/** 약 25가지 클래스가 출력으로 나옴
			 * 5가지 대분류로 나눈 뒤, 이미지 테이블에는 상세 출력 결과
			 * 이슈 테이블에는 대분류 저장
			 */
			const result = await prisma.issue.update({
				where: { id: issueId },
				data: {
					class: imageClass,
				},
			});
			// console.log(result);
			// If Done
			child.kill();
		});
	} catch (err) {
		log(err);
	}
}
/**
 https://bb-library.tistory.com/214
 */
