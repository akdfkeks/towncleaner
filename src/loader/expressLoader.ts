import cors from "cors";
import router from "../api";
import express, { NextFunction, Response } from "express";
import passport from "passport";
import config from "../config";
import cookieParser from "cookie-parser";

export default async ({ app }: { app: express.Application }) => {
	// For Application
	app.use(cors());
	app.use(cookieParser(config.JWT_SECRET));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(passport.initialize());
	app.use(express.static("public"));

	// Initialize routers
	app.use(router());
};
