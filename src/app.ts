import express from "express";
import config from "./config";
import router from "./api";
import cors from "cors";
import "reflect-metadata";

async function createServer() {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(router());

	app.listen(config.port, () => {
		console.log(`Server listening on http://${config.host}:${config.port}`);
	});
}

createServer();
