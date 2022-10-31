import { UserAuthInfo } from "../../interface/Issue";
import { Contents } from "../../interface/Issue";
import { LatLng } from "../../interface/Issue";

export {};

declare global {
	namespace Express {
		export interface Request {
			reqUser?: UserAuthInfo;
		}
	}
}
