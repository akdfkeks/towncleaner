import { Issue } from "../interface/Issue";

export const MSG = {
	SUCCESS: {
		AUTH: {
			SIGN_IN: "로그인에 성공했습니다.",
			SIGN_UP: "회원가입에 성공했습니다.",
		},
		ISSUE: {
			CREATE: "이슈 제보에 성공했습니다.",
			LOOKUP: "이슈 정보 조회에 성공했습니다.",
			LOOKUP_LIST: "이슈 목록 조회에 성공했습니다.",
			SOLVE_TRY: "해결 제보 신청에 성공했습니다.",
		},
	},
	FAILURE: {
		ISSUE: {
			CREATE: "이슈 생성에 실패했습니다.",
			LOOKUP: "이슈 정보 조회에 실패했습니다.",
			LOOKUP_LIST: "이슈 목록 조회에 실패했습니다.",
		},
		IMAGE: {
			PARSE: "이미지에 위치태그 또는 GPS 정보가 존재하지 않습니다.",
		},
	},
	ERROR: {
		AUTH: {
			UN_AUTHORIZATION: "로그인이 필요한 기능입니다.",
		},
	},
};

export const fixedPointIssueList: Issue[] = [
	{
		issueId: 1000,
		userId: "test1",
		createdAt: null,
		title: "현호집",
		body: "현호네 집입니다",
		code: 0,
		category: 0,
		issueLoc: {
			lat: 37.454448442968726,
			lng: 127.130440332797,
		},
		userLoc: {
			lat: 37.454448442968726,
			lng: 127.130440332797,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		issueId: 1001,
		userId: "test1",
		createdAt: null,
		title: "현호집앞 GS25",
		body: "현호네 집 앞 GS25 편의점 입니다",
		category: 1,
		code: 1,
		issueLoc: {
			lat: 37.45475010681343,
			lng: 127.13059908661702,
		},
		userLoc: {
			lat: 37.45475010681343,
			lng: 127.13059908661702,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		issueId: 1002,
		userId: "test1",
		createdAt: null,
		title: "현호집주변 CU",
		body: "현호네 집 앞 CU 편의점 입니다",
		category: 2,
		code: 2,
		issueLoc: {
			lat: 37.4540213271891,
			lng: 127.12965410009392,
		},
		userLoc: {
			lat: 37.4540213271891,
			lng: 127.12965410009392,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
	{
		issueId: 1003,
		userId: "test1",
		createdAt: null,
		title: "현호집앞 더러운곳",
		body: "현호가 쓰레기 무단투기하는 장소입니다",
		category: 3,
		code: 3,
		issueLoc: {
			lat: 37.45413091149697,
			lng: 127.13037196908954,
		},
		userLoc: {
			lat: 37.45413091149697,
			lng: 127.13037196908954,
		},
		imgUrl: "https://towncleaner.s3.ap-northeast-2.amazonaws.com/56CDAC60-3DC2-417B-9B3A-4539F601E3A0_1_102_o.jpeg",
	},
];
