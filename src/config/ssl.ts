import fs from "fs";
import path from "path";
import config from "./";
import https from "https";

export const options: null | https.ServerOptions = config.isProd
	? {
			ca: fs.readFileSync(config.fullchain),
			key: fs.readFileSync(config.privkey),
			cert: fs.readFileSync(config.cert),
	  }
	: null;
