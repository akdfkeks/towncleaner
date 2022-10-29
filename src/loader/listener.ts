import EventEmitter from "eventemitter3";
import { LatLng } from "../interface/Issue";
import { postImageHandler, issueImageHandler } from "../function/imageUploader";

export const eventEmitter = new EventEmitter();

export async function loadEventListener() {
	eventEmitter.on("issueImage", ({ issueId, fileName, originName, location }) => {
		issueImageHandler(issueId, fileName, originName, location);
	});

	eventEmitter.on("postImage", ({ postId, fileName, originName }) => {
		postImageHandler(postId, fileName, originName);
	});
}
