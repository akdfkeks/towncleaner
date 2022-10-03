import express from "express";
import config from "./config";
import router from "./api";
import appLoader from "./loader";
import "reflect-metadata";

async function createServer() {
	const app = express();

	await appLoader({ app });

	app.listen(config.port, () => {
		console.log(`Server listening on http://${config.host}:${config.port}`);
	});
}

createServer();
