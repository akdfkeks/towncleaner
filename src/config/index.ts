import * as dotenv from "dotenv";

dotenv.config();

export default {
	// Server
	host: "localhost",
	port: 3000,

	// Authentication
	JWT_SECRET: "tcsecret",
	isDev: process.env.NODE_ENV == "development",
};
