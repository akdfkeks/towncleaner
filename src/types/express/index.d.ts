import { UserAuthInfo } from "../../interface/Issue";
import { IssueContent } from "../../interface/Issue";
import { LatLng } from "../../interface/Issue";

export {};

declare global {
	namespace Express {
		interface RequestBody {
			issue?: IssueContent;
			test?: string;
		}

		export interface Request {
			reqUser?: UserAuthInfo;
		}
	}
}
