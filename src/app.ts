import express from "express";
import config from "./config";
import router from "./api";

async function createServer() {
	const app = express();

	app.use(router());

	app.listen(config.port, () => {
		console.log(`Server listening on http://${config.host}:${config.port}`);
	});
}

createServer();
