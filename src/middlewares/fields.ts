import { type Request, type Response, type NextFunction } from 'express';
import { type ValidationChain, validationResult } from 'express-validator';

export function validateFields(validations: ValidationChain[]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		await Promise.all(
			validations.map(async (validation) => await validation.run(req)),
		);

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			next();
			return;
		}

		res.status(403).send({
			success: false,
			message: 'Validation error body',
			error: errors.array(),
		});
	};
}
