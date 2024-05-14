export function getFilePath(file: any): string {
	const filePath = file.path;
	const fileSplit = filePath.split('\\');
	return `${fileSplit[2]}/${fileSplit[3]}`;
}
