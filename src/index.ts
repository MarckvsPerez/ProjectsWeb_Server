import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const IP_SERVER = process.env.IP_SERVER;
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

void (async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`,
		);
		app.listen(PORT, () => {
			console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
		});
	} catch (error: any) {
		console.error('Error connecting to MongoDB using Mongoose:', error.message);
	}
})();
