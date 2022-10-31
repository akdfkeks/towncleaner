export interface Contents {
	title: string | null;
	category: number | null;
	code: number | null;
	body: string | null;
	userLoc: LatLng | null;
}

export interface Issue extends Contents {
	issueId: number | null;
	userId: string | null;
	issueLoc: LatLng | null;
	createdAt: Date | null;
	imgUrl: string | null;
}

export interface IssueCreateReq {
	user: UserAuthInfo;
	issue: Contents;
	image: Image;
}

export interface IssueListReq {
	user: UserAuthInfo | null;
	location: LatLng | null;
}

export interface UserAuthInfo extends UserInfo {}

interface UserInfo {
	id: string | null;
	name: string | null;
}

export interface IssueImageInfo extends ImageInfo {
	class: number[] | null;
}

export interface ImageInfo extends Image {
	src: string | null;
	location: LatLng | null;
}

export interface Image {
	originName: string | null;
	fileName: string | null;
}

export interface LatLng {
	lat: number | null;
	lng: number | null;
}

export interface Bound {
	ne: LatLng | null;
	sw: LatLng | null;
}
