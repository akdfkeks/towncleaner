export interface UserBound {
	southWest: Point;
	northEast: Point;
}

export interface Point {
	lat: Number;
	lng: Number;
}

export interface AddIssueRequest extends UserBound {}

/**
 * 유저에게 반환될 이슈는 다음의 요소를 가져야함
 * 1. 제목
 * 2. 내용
 * 3. 사진
 * 4. 클래스
 * 5. 위치(위도, 경도)
 */
export interface IssuePoint {
	title: string;
	body: string;
	class: Number;
	location: TempPoint;
	img: string;
}

interface TempPoint {
	lat: string;
	lng: string;
}
