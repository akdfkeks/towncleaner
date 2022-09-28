export interface IssueListRequest {
	user_latitude: string;
	user_longitude: string;
}

export interface AddIssueRequest extends IssueListRequest {}

export interface IssuePoint {
	title: string;
	body: string;
	class: string;
	latitude: string;
	longitude: string;
}
