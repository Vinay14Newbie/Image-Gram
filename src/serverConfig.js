import dotenv from 'dotenv';

dotenv.config();

export const DB_URL = process.env.DB_URL;

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;

export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

export const AWS_REGION = process.env.AWS_REGION;