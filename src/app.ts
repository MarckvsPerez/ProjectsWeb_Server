import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './router';

dotenv.config();

const API_VERSION = process.env.API_VERSION;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('uploads'));
app.use(cors());

app.use(`/api/${API_VERSION}`, routes);
export default app;
