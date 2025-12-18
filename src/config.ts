import dotenv from 'dotenv';

dotenv.config();

export const Secret = process.env.JWT_SECRET as string;