import jwt from 'jsonwebtoken'

export const generateJwtToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: 'Id'});
}