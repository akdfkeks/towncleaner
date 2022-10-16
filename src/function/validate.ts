import { IssueCreateReq } from "../interface/Issue";
import { Request } from "express";
import config from "../config";

export function issueCreateReqValidator(req: Request) {
	const { body } = req;
}
