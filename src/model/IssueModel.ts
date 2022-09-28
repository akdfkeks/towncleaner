import { Container } from "typedi";
import prisma from "@/loader/prisma";

class IssueModel {
	constructor() {}
	postIssue() {}
}

Container.set("IssueModel", new IssueModel());

export default IssueModel;
