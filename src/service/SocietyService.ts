import { PostListReq, PostCreateReq } from "../interface/Society";
import { Service } from "typedi";
import prisma from "../config/prisma";

@Service()
class SocietyService {
	constructor() {}
	async getPostList(postListReq: PostListReq) {
		try {
			const postList = await prisma.post.findMany({
				where: {
					category: postListReq.category,
					active: true,
					solved: false,
				},
				take: 20,
				skip: postListReq.index.lastPost ? 1 : 0,
				...(postListReq.index.lastPost && { cursor: { id: postListReq.index.lastPost } }),
			});

			return postList;
		} catch (err) {
			throw new Error(err);
		}
	}

	async createPost(createPostReq: PostCreateReq) {
		try {
			const postCreateResult = await prisma.post.create({
				data: createPostReq.post,
			});

			return postCreateResult;
		} catch (err) {
			throw new Error(err);
		}
	}

	async getTradeList(page?: number, lastPost?: number) {
		try {
			const postList = await prisma.post.findMany({
				where: {
					category: "trade",
					active: true,
					solved: false,
				},
				take: 20,
				skip: lastPost ? 1 : 0,
				...(lastPost && { cursor: { id: lastPost } }),
			});

			return postList;
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default SocietyService;
