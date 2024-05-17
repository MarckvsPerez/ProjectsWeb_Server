import multer from 'multer';
import path from 'path';

export const uploadAvatar = multer({
	dest: 'src/uploads/avatar',
	storage: multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, 'src/uploads/avatar');
		},
		filename: (_req, file, cb) => {
			const ext = path.extname(String(file.originalname));
			cb(null, file.fieldname + '-' + Date.now() + ext);
		},
	}),
});

export const uploadMiniature = multer({
	dest: 'src/uploads/miniature',
	storage: multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, 'src/uploads/miniature');
		},
		filename: (_req, file, cb) => {
			const ext = path.extname(String(file.originalname));
			cb(null, file.fieldname + '-' + Date.now() + ext);
		},
	}),
});
