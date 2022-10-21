import EventEmitter from "eventemitter3";
import { processImage } from "../function/imageUploader";

export const eventEmitter = new EventEmitter();

export async function loadEventListener() {
	eventEmitter.on("processImage", ({ issueId, fileName, location }) => {
		console.log("processImage");
		/**
		 * 이미지 처리 후 어떤 이슈에 연결해야 하는지
		 * 어떤 이미지를 처리할건지
		 * 이미지 데이터 정보
		 */
		processImage(issueId, fileName, location);
	});
}
