import multer from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

try {
	fs.readdirSync("uploads");
} catch (err) {
	console.error("Not Exist 'upload' Folder. Creating Folder...");
	fs.mkdirSync("uploads");
}

const saveFileToLocal = multer({
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

const saveFileToS3 = multer({});

export function saveFile(req: Request, res: Response, next: NextFunction) {
	saveFileToLocal.single("image")(req, res, next);
	//saveFileToS3.single("image")(req, res, next);
	next();
}
// export const uploadFileToS3; <- multer-s3 사용하기
