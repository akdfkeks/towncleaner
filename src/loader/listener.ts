import EventEmitter from "eventemitter3";
import { uploadImageToS3 } from "src/function/imageUploader";

export const eventEmitter = new EventEmitter();

export async function loadEventListener() {
	eventEmitter.on("uploadImageToS3", ({ issueId, fileName, location }) => {
		console.log("uploadImageToS3 emitted");
		uploadImageToS3(issueId, fileName, location);
	});
}
