import fs from "fs";
import config from ".";
import https from "https";
import os from "os";

const isProd = os.platform() == "darwin" ? false : true;

export const httpsOptions: https.ServerOptions | null = isProd
	? {
			ca: fs.readFileSync(config.fullchain),
			key: fs.readFileSync(config.privkey),
			cert: fs.readFileSync(config.cert),
	  }
	: null;
