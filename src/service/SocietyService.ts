import { PostListReq, PostCreateReq } from "../interface/Society";
import { Service } from "typedi";
import prisma from "../config/prisma";
import EventEmitter from "eventemitter3";
import { eventEmitter } from "../loader/listener";

@Service()
class SocietyService {
	private eventEmitter: EventEmitter;
	constructor() {
		this.eventEmitter = eventEmitter;
	}
	async getPostList(postListReq: PostListReq) {
		try {
			const postList = await prisma.post.findMany({
				where: {
					category: postListReq.category,
					active: true,
					solved: false,
				},
				include: {
					Post_img: true,
				},
				// 프론트의 개발이 미뤄져 임시로 주석처리.
				// take: 20,
				// skip: postListReq.index.lastPost ? 1 : 0,
				// ...(postListReq.index.lastPost && { cursor: { id: postListReq.index.lastPost } }),
			});

			// 임시입니다
			const tempList = postList.map((post) => {
				return {
					id: post.id,
					title: post.title,
					body: post.body,
					category: post.category,
					price: post.price,
					image: post.Post_img[0].src,
					uploadedAt: post.created_at,
					userId: post.user_id,
					location: {
						lat: post.user_lat,
						lng: post.user_lng,
					},
				};
			});
			return tempList;

			//return postList;
		} catch (err) {
			throw new Error(err);
		}
	}

	async createPost(createPostReq: PostCreateReq) {
		try {
			const postCreateResult = await prisma.post.create({
				data: {
					user: {
						connect: {
							id: createPostReq.user.id,
						},
					},
					title: createPostReq.post.title,
					category: createPostReq.post.category,
					body: createPostReq.post.body,
					price: createPostReq.post.price,
					user_lat: createPostReq.post.userLocation.lat,
					user_lng: createPostReq.post.userLocation.lng,
				},
			});

			const data = {
				postId: postCreateResult.id,
				fileName: createPostReq.image.fileName,
				originName: createPostReq.image.originName,
			};
			eventEmitter.emit("postImage", data);

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
