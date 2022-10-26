export const MSG = {
	SUCCESS: {
		AUTH: {
			SIGN_IN: "Sign-in succeed",
			SIGN_UP: "Sign-up succeed",
		},
		ISSUE: {
			CREATE: "Issue creation success",
			LOOKUP: "Issue information search success",
			LOOKUP_LIST: "Issue list search success",
			SOLVE: "Issue solve request sent success",
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
			UN_AUTHORIZATION: "Unauthorization : ",
		},
	},
};
