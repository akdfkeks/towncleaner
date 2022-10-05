import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

try {
	fs.readdirSync("upload");
} catch (err) {
	console.error("Not Exist 'upload' Folder. Creating Folder…");
	fs.mkdirSync("upload");
}

let fileStorage = multer.diskStorage({
	// 저장 폴더 위치
	destination: (req, file, cb) => {
		cb(null, "upload/");
	},
	//파일이름
	filename: (req, file, cb) => {
		cb(null, new Date().valueOf() + path.extname(file.originalname));
	},
});

export const multerUpload = multer({
	storage: fileStorage,
	limits: {
		fileSize: 20 * 1080 * 1080, // 20MB 로 제한
	},
});

export default (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	console.log(req.file);
	return res.json("Success");
};
