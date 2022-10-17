import IssueModel from "../model/IssueModel";
import AuthModel from "../model/AuthModel";
import { Container } from "typedi";
import ImageModel from "../model/ImageModel";
import "reflect-metadata";

export default async () => {
	Container.set("AuthModel", new AuthModel());
	Container.set("IssueModel", new IssueModel());
	Container.set("ImageModel", new ImageModel());
};
