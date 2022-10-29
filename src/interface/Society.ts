import { UserAuthInfo } from "./Auth";
import { ImageInfo, LatLng, PostImageInfo } from "./Issue";

export interface PostListReq {
	user: UserAuthInfo | null;
	category: "none" | "trade" | "quest";
	location: LatLng;
	// index: Index | null;
}

export interface PostCreateReq {
	user: UserAuthInfo | null;
	post: Post | null;
	image: PostImageInfo | null;
}

export interface PostEntity {}

interface Index {
	page: number | null;
	lastPost: number | null;
}

export interface Post {
	category: "none" | "trade" | "quest";
	title: string | null;
	body: string | null;
	price: number | null;
	userLocation: LatLng;
}
