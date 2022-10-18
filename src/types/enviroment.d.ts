export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;

			JWT_SECRET: string;
			NODE_ENV: "development" | "production";

			S3_ACCESS_KEY: string;
			S3_SECRET_KEY: string;
			BUCKET_NAME: string;

			FULLCHAIN: string;
			PRIVKEY: string;
			CERT: string;
		}
	}
}
