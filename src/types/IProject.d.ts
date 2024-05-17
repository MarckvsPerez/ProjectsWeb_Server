export interface IProject {
	title: string;
	miniature: string;
	content: string;
	path: {
		type: string;
		unique: true;
	};
	created_at: Date;
}
