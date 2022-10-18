import express from "express";
import config from "./config";
import appLoader from "./loader";
import https from "https";
import http from "http";

async function createServer() {
	const app = express();

	await appLoader({ app });

	try {
		http.createServer(app).listen(config.port, () => {
			console.log(`Server listening on http://${config.host}:${config.port}`);
		});

		https.createServer(config.httpsOptions, app).listen(443);
	} catch (err) {
		console.log(err);
	}
}

createServer();
