import dotenv from "dotenv";
dotenv.config();

export default {
	// Server
	host: "localhost",
	port: 3001,

	// Authentication
	JWT_SECRET: process.env.JWT_SECRET as string,

	// isDev: process.env.NODE_ENV == "development",
	isDev: true,

	// Amazone S3 Bucket key
	s3AccessKey: process.env.S3_ACCESS_KEY as string,
	s3SecretKey: process.env.S3_SECRET_KEY as string,
	bucketName: process.env.BUCKET_NAME as string,

	// letsencrypt cert key path
	fullchain: process.env.FULLCAIN as string,
	privkey: process.env.PRIVKEY as string,
	cert: process.env.CERT as string,

	//https options object
};
