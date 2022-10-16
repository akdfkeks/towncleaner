import { UserAuthInfo } from "./Auth";

export interface UserRequest {
	user?: UserAuthInfo | null;
}

/** 내 주변 이슈 리스트 요청
 * 1. 유저 인증 정보
 * 2. 유저 위치 (지도의 바운딩박스)
 */
export interface IssueListReq extends UserRequest {
	bound?: Bound | null;
}

/** 유저로부터의 이슈 생성 요청
 * 1. 유저 인증 정보
 * 2. 이슈에 대한 정보 (IssueContent)
 * 3. 사진에 대한 정보 (IssueImageInfo, from multer)
 */
export interface IssueCreateReq extends UserRequest {
	issue: IssueContent | null;
	image: IssueImageInfo | null;
}

/** 유저에게 반환할 이슈 리스트의 요소(이슈) 타입
 * 1. 제목
 * 2. 클래스
 * 3. 본문
 * 4. 이슈 위치(이미지 메타데이터 우선)
 * 5. 이미지 링크
 */
export interface IssueInfo extends IssueContent {
	imgUrl?: string | null;
}

/** 유저 Bounding Box
 * 1. NorthEast 북동쪽
 * 2. SouthWest 남서쪽
 */
export interface Bound {
	ne: LatLng | null;
	sw: LatLng | null;
}

/** 위도 경도 정보를 담은 Object
 * 1. Latitude 위도
 * 2. Longitude 경도
 */
export interface LatLng {
	lat: Number | null;
	lng: Number | null;
}

/** 유저로부터의 이슈 해결 시도(?) 요청
 * 1. 유저 인증 정보
 * 2. 해결에 대한 정보 (임시로 body: string 타입)
 * 3. 사진에 대한 정보 (IssueImageInfo, from multer)
 */
export interface IssueSolvesReq extends UserRequest {
	body: string | null;
	image: ImageInfo | null;
}

/**
 * 이슈 생성 요청에 들어있는 issue object 의 type
 * 1. 제목
 * 2. 클래스
 * 3. 본문
 * 4. 유저 위치
 */
export interface IssueContent {
	title?: string | null;
	class?: number | null;
	body?: string | null;
	location?: LatLng | null;
}

export interface IssueImageInfo extends ImageInfo {
	class?: number | null;
}

interface ImageInfo {
	originName: string;
	fileName: string;
	createdAt?: Date | null;
	location?: LatLng | null;
}
