import { type ValidationChain, body } from 'express-validator';

export const createFields: ValidationChain[] = [
	body('title')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Title must be a string'),

	body('content')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Content must be a string'),

	body('path')
		.notEmpty()
		.withMessage('⛔ The field cannot be empty.')
		.isString()
		.withMessage('⛔ Path must be a string'),

	body().custom((value: Record<string, string>) => {
		const allowedFields = ['title', 'path', 'content'];
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
