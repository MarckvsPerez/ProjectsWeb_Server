import { type ValidationChain, body } from 'express-validator';

export const createFields: ValidationChain[] = [
	body('firstName')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ First name must be a string'),

	body('lastName')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Last name must be a string'),

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

	body('role')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Role must be a string'),

	body().custom((value: Record<string, string>) => {
		const allowedFields = [
			'firstName',
			'lastName',
			'email',
			'password',
			'role',
		];
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

export const updateFields: ValidationChain[] = [
	body('firstName')
		.optional()
		.isString()
		.withMessage('⛔ First name must be a string'),

	body('lastName')
		.optional()
		.isString()
		.withMessage('⛔ Last name must be a string'),

	body('email')
		.optional()
		.isEmail()
		.withMessage('⛔ Please enter a valid email address.'),

	body('password')
		.optional()
		.isString()
		.withMessage('⛔ Password must be a valid string.')
		.isLength({ min: 8 })
		.withMessage('⛔ Password must be at least 8 characters long.'),

	body('role')
		.optional()
		.isString()
		.withMessage('⛔ Role field must be a string'),

	body().custom((value: Record<string, string>) => {
		const allowedFields = [
			'firstName',
			'lastName',
			'email',
			'password',
			'role',
		];
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
