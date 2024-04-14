export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	active: boolean;
	role: string;
	avatar: string;
}

export interface IRegisteredUser extends IUser {
	_id: string;
}
