import bcrypt from 'bcrypt';

const passwordHash = password => bcrypt.hashSync(password, Number(process.env.SALT));

const comparePasswords = (userPass, hashedPass) => bcrypt.compareSync(userPass, hashedPass);

export default {
  passwordHash, comparePasswords,
};
