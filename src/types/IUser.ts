export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	active: boolean;
	avatar: string;
}

export interface IRegisteredUser extends IUser {
	_id: string;
}
