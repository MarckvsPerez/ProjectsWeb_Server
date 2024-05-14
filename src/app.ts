import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import routes from './router';

dotenv.config();

const API_VERSION = process.env.API_VERSION;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uploadsDirectory = path.join(__dirname, 'uploads');
app.use(express.static(uploadsDirectory));

app.use(cors());

app.use(`/api/${API_VERSION}`, routes);
export default app;
