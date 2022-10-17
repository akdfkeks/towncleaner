import express from "express";
import config from "./config";
import router from "./api";
import appLoader from "./loader";
import "reflect-metadata";
import fs from "fs";
import https from "https";
import http from "http";
import path from "path";

const options = {
	ca: fs.readFileSync(path.join("/home/ubuntu/letsencrypt/live/valun.kro.kr/fullchain.pem")),
	key: fs.readFileSync(path.join("/home/ubuntu/letsencrypt/live/valun.kro.kr/privkey.pem")),
	cert: fs.readFileSync(path.join("/home/ubuntu/letsencrypt/live/valun.kro.kr/cert.pem")),
};

async function createServer() {
	const app = express();

	await appLoader({ app });

	http.createServer(app).listen(config.port, () => {
		console.log(`Server listening on http://${config.host}:${config.port}`);
	});
	https.createServer(options, app).listen(443, () => {
		console.log(`Server listening on https://${config.host}:${config.port}`);
	});
}

createServer();
