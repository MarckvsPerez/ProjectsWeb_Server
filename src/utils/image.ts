export function getFilePath(file: Express.Multer.File): string {
	const filePath = file.path;
	const fileSplit = filePath.split('\\');
	return `${fileSplit[2]}/${fileSplit[3]}`;
}
