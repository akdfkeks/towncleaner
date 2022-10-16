import { Decimal } from "@prisma/client/runtime";

interface IssueContent {
	title: string | null;
	class: number | null;
	body: string | null;
	issueLoc: LatLng | null;
	reportingLoc: LatLng | null;
}

/** 유저에게 반환할 이슈 리스트의 요소(이슈) 타입
 * 1. 이슈 ID
 * 2. 제보자
 * 3. 제보일
 * 4. 제보 내용
 * 5. 이슈 위치(이미지 메타데이터 우선)
 * 6. 이미지 링크
 */
export interface IssueInfo extends IssueContent {
	issueId: number | null;
	issuer: string | null;
	createdAt: Date | null;
	reportingLoc: LatLng | null;
	imgUrl: string | null;
}

/** 이슈 생성 요청
 * 1. 유저 인증 정보
 * 2. 이슈에 대한 정보 (IssueContent)
 * 3. 사진에 대한 정보 (IssueImageInfo, from multer)
 */
export interface IssueCreateReq {
	user: UserAuthInfo;
	issue: IssueContent;
	image: IssueImageInfo;
}
export interface IssueSolveReq {
	user: UserAuthInfo;
	issue: IssueContent;
	image: IssueImageInfo;
}

/** 내 주변 이슈 리스트 요청
 * 1. 유저 인증 정보
 * 2. 유저 위치 (지도의 바운딩박스)
 */
export interface IssueListReq {
	user: UserAuthInfo | null;
	bound: Bound | null;
}

export interface UserAuthInfo extends UserInfo {}

interface UserInfo {
	id: string | null;
	name: string | null;
}

export interface IssueImageInfo extends ImageInfo {
	src: string | null;
	class: number | null;
	location: LatLng | null;
}

interface PostImageInfo extends ImageInfo {}

interface ImageInfo {
	originName: string | null;
	fileName: string | null;
	createdAt: Date | null;
}

interface LatLng {
	lat: Decimal | null;
	lng: Decimal | null;
}

export interface Bound {
	ne: LatLng | null;
	sw: LatLng | null;
}
