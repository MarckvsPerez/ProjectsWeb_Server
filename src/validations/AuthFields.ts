import { type ValidationChain, body } from 'express-validator';

export const registerFields: ValidationChain[] = [
	body('firstname')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Firstname must be a string'),

	body('lastname')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Lastname must be a string'),

	body('email')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isEmail()
		.withMessage('⛔ Please enter a valid email address.'),

	body('password')
		.notEmpty()
		.withMessage('⛔ The password field cannot be empty.')
		.isString()
		.withMessage('⛔ Password must be a valid string.')
		.isLength({ min: 8 })
		.withMessage('⛔ Password must be at least 8 characters long.'),

	body().custom((value: Record<string, string>) => {
		const allowedFields = ['firstname', 'lastname', 'email', 'password'];
		const invalidFields = Object.keys(value).filter(
			(key) => !allowedFields.includes(key),
		);

		if (invalidFields.length > 0) {
			throw new Error(
				`⛔ The following fields are not allowed: ${invalidFields.join(', ')}`,
			);
		}

		return true;
	}),
];

export const loginFields: ValidationChain[] = [
	body('email')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isEmail()
		.withMessage('⛔ Please enter a valid email address.'),

	body('password')
		.notEmpty()
		.withMessage('⛔ The password field cannot be empty.')
		.isString()
		.withMessage('⛔ Password must be a valid string.'),

	body().custom((value: Record<string, string>) => {
		const allowedFields = ['email', 'password'];
		const invalidFields = Object.keys(value).filter(
			(key) => !allowedFields.includes(key),
		);

		if (invalidFields.length > 0) {
			throw new Error(
				`⛔ The following fields are not allowed: ${invalidFields.join(', ')}`,
			);
		}

		return true;
	}),
];

export const refreshFields: ValidationChain[] = [
	body('token')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Token must be a string'),

	body().custom((value: Record<string, string>) => {
		const allowedFields = ['token'];
		const invalidFields = Object.keys(value).filter(
			(key) => !allowedFields.includes(key),
		);

		if (invalidFields.length > 0) {
			throw new Error(
				`⛔ The following fields are not allowed: ${invalidFields.join(', ')}`,
			);
		}

		return true;
	}),
];
