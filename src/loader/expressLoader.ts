import cors from "cors";
import router from "../api";
import express, { NextFunction, Response } from "express";
import passport from "passport";

export default async ({ app }: { app: express.Application }) => {
	// For Application
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(passport.initialize());

	// Initialize routers
	app.use(router());
};
