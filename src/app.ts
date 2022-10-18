import express from "express";
import config from "./config";
import appLoader from "./loader";
import https from "https";
import http from "http";

async function createServer() {
	const app = express();

	await appLoader({ app });

	http.createServer(app).listen(config.port, () => {
		console.log(`Server listening on http://${config.host}:${config.port}`);
	});

	if (config.isProd) {
		https.createServer(config.httpsOptions, app).listen(443);
	}
}

createServer();
