import { UserAuthInfo } from "./Auth";

export interface PostListReq {
	user: UserAuthInfo | null;
	category: "none" | "trade" | "quest";
	index: Index | null;
}

export interface PostCreateReq {
	user: UserAuthInfo | null;
	post: Post | null;
}

interface Index {
	page: number | null;
	lastPost: number | null;
}

export interface Post {
	category: "none" | "trade" | "quest";
	title: string | null;
	body: string | null;
	price: number | null;
}
