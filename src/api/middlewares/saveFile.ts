import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
// import AWS from "aws-sdk";
// import multerS3 from "multer-s3";
import storage from "../../config/s3Config";

try {
	fs.readdirSync("uploads");
} catch (err) {
	console.error("Not Exist 'upload' Folder. Creating Folder...");
	fs.mkdirSync("uploads");
}

export const saveFileToLocal = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "uploads/");
		},
		filename: function (req, file, cb) {
			cb(null, new Date().valueOf() + path.extname(file.originalname));
		},
	}),
	limits: {
		fileSize: 20 * 1024 * 1024,
	},
});

// const saveFileToS3 = multer({
// 	storage: multerS3({
// 		s3: storage,
// 		bucket: "towncleaner",
// 		key: (req, file, cb) => {
// 			cb(null, new Date().valueOf() + path.extname(file.originalname));
// 		},
// 	}),
// });

// export function saveFile(req: Request, res: Response, next: NextFunction) {
// 	saveFileToLocal.single("image")(req, res, next);
// 	saveFileToS3.single("image")(req, res, next);
// 	console.log(req.file);
// 	next();
// }
export function saveFileV2(req: Request, res: Response, next: NextFunction) {
	saveFileToLocal.single("image")(req, res, next);

	console.log(req.file);
	next();
}
// export const uploadFileToS3; <- multer-s3 사용하기
