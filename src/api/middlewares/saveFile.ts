import multer from "multer";
import path from "path";
import fs from "fs";

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

// export const uploadFileToS3; <- multer-s3 사용하기
