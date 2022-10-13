import dotenv from "dotenv";

dotenv.config();

export default {
	// Server
	host: "localhost",
	port: 3001,

	// Authentication
	JWT_SECRET: "tcsecret",
	// isDev: process.env.NODE_ENV == "development",
	isDev: true,
	s3AccessKey: process.env.S3_ACCESS_KEY as string,
	s3SecretKey: process.env.S3_SECRET_KEY as string,
	bucketName: process.env.BUCKET_NAME as string,
};
