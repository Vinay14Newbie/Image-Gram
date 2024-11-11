import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../serverConfig.js';

export const generateJwtToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}