import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const apiSecret = process.env.API_SECRET;

// const generateToken = ({ id, isadmin, status }) => jwt.sign({
//   id, isadmin, status,
// }, apiSecret, {
//   expiresIn: '3d',
// });

const generateToken = (id, isadmin, status) => {
  const token = jwt.sign({
    userId : id,
    isadmin: isadmin,
    status: status,
  },
  process.env.API_SECRET, {expiresIn: '3d'}
  );
  return token;
}
export default generateToken;
