import { IssueCreateReq } from "../interface/Issue";
import { Request } from "express";
import config from "../config";

export function issueCreateReqValidator(req: Request) {
	const { body } = req;

	const issueCreateReq: IssueCreateReq = {
		user: !body.user.id && config.isDev ? "test1" : body.user.id,
		issue: {
			title: !body.issue.title && config.isDev ? "" : body.issue.title,
			class: !body.issue.class && config.isDev ? "" : body.issue.class,
			body: !body.issue.body && config.isDev ? "" : body.issue.body,
			user_loc: !body.issue.location && config.isDev ? "" : body,
		},
	};
}
