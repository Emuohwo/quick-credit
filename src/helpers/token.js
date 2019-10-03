import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const apiSecret = process.env.API_SECRET;

const generateToken = ({ id, isadmin }) => jwt.sign({
  id, isadmin,
}, apiSecret, {
  expiresIn: '3d',
});
export default generateToken;
