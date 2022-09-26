import { Router } from "express";
import mainController from "@/controller/mainController";
import issuePoint from "@/interface/issuePoint";

const route = Router();

const issuePointList: issuePoint[] = [
	{
		title: "현호집",
		body: "현호네 집입니다",
		class: "pollution",
		latitude: "37.454448442968726",
		longitude: "127.130440332797",
	},
	{
		title: "현호집앞 GS25",
		body: "현호네 집 앞 GS25 편의점 입니다",
		class: "pollution",
		latitude: "337.45475010681343",
		longitude: "127.13059908661702",
	},
	{
		title: "현호집주변 CU",
		body: "현호네 집 앞 CU 편의점 입니다",
		class: "pollution",
		latitude: "37.4540213271891",
		longitude: "127.12965410009392",
	},
	{
		title: "현호집앞 더러운곳",
		body: "현호가 쓰레기 무단투기하는 장소입니다",
		class: "pollution",
		latitude: "37.45413091149697",
		longitude: "127.13037196908954",
	},
];

export default (app: Router) => {
	app.use("/", route);

	route.get("/", async (req, res) => {
		res.status(200).json({ success: true, message: "Issue-point list", data: issuePointList });
	});
	route.post("/", async (req, res) => {});
	route.post("/", async (req, res) => {});
};
