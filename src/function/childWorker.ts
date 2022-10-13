import { spawn } from "child_process";
import prisma from "../config/prisma";

enum detectClass {}

export async function detectObject(fileName: string, issueId: number) {
	const child = spawn("python", ["app.py", fileName]);

	child.stdout.on("data", async (data) => {
		console.log(data);
		console.log(data.toString());

		// DB 에 클래스 넣기
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
