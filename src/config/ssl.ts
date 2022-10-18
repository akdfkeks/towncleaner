import fs from "fs";
import config from ".";
import https from "https";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

const isProd = os.platform() == "darwin" ? false : true;

export const httpsOptions: https.ServerOptions | null = isProd
	? {
			ca: fs.readFileSync(process.env.FULLCAIN as string),
			key: fs.readFileSync(process.env.PRIVKEY as string),
			cert: fs.readFileSync(process.env.CERT as string),
	  }
	: null;
