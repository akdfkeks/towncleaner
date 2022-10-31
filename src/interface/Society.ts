import { UserAuthInfo } from "./Auth";
import { Image, LatLng } from "./Issue";

export interface PostListReq {
	user: UserAuthInfo | null;
	category: "none" | "trade" | "quest";
	location: LatLng;
	// index: Index | null;
}

export interface PostCreateReq {
	user: UserAuthInfo | null;
	post: Post | null;
	image: Image | null;
}

export interface PostEntity {}

interface Index {
	page: number | null;
	lastPost: number | null;
}

export interface Post {
	title: string | null;
	category: "none" | "trade" | "quest";
	body: string | null;
	price: number | null;
	userLoc: LatLng;
}
