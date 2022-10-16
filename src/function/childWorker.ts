import { spawn } from "child_process";
import prisma from "../config/prisma";

enum detectClass {}

export async function detectObject(fileName: string, issueId: number, imageId: number) {
	const child = spawn("python", ["app.py", fileName]);

	child.stdout.on("data", async (data) => {
		console.log(data);
		console.log(data.toString());
		/** 약 25가지 클래스가 출력으로 나옴
		 * 5가지 대분류로 나눈 뒤, 이미지 테이블에는 상세 출력 결과
		 * 이슈 테이블에는 대분류 저장
		 */
		const result = await prisma.issue.update({
			where: { id: issueId },
			data: {
				class: 0,
			},
		});
		// If Done
		child.kill();
	});
}
/**
 https://bb-library.tistory.com/214
 */
