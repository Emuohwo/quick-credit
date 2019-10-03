import db from '../models/db/db';
import generateToken from '../helpers/token';
import validator from '../helpers/validRegex';
import passwordHashed from '../helpers/password';

const User = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  async signUpUser(req, res) {
    if (!validator.isValidEmail(req.body.email)) {
      return res.status(400).send('Invalid email. Please check your spellings!');
    }

    if (!validator.noEmptySpaces(req.body.email)) {
      return res.status(400).send('Invalid email. Spaces are not allowed before or after email!');
    }

    const hashPassword = passwordHashed.passwordHash(req.body.password);

    const columns = `INSERT INTO
    users(email, firstname, lastname, password, address) 
    VALUES($1, $2, $3, $4, $5) returning *`;
    const columnsValues = [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      hashPassword,
      req.body.address,
    ];

    try {
      const { rows } = await db.query(columns, columnsValues);
      // console.log(rows[0]);
      const token = generateToken(rows[0].id, rows[0].isadmin);
      const {
        id, email, firstname, lastname, address, status, isadmin, createdon,
      } = rows[0];
      const user = {
        id,
        email,
        firstname,
        lastname,
        address,
        status,
        createdon,
        isadmin,
      };

      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user,
          message: 'Account created Successfully',
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User already exist' });
      }
      return res.status(400).send({
        status: 400,
        error: {
          message: error.message,
        },
      });
    }
  },
  async logInUser(req, res) {
    const column = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(column, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send(400, 'User not found');
      }
      if (!passwordHashed.comparePasswords(req.body.password, rows[0].password)) {
        return res.status(401).send('Incorrect Password');
      }
      const {
        id, email, firstname, lastname, address, status, isadmin, createdon,
      } = rows[0];
      const user = {
        id,
        email,
        firstname,
        lastname,
        address,
        status,
        createdon,
        isadmin,
      };
      const token = generateToken(rows[0].id, rows[0].isadmin);
      return res.status(200).send({
        status: 200,
        data: [{
          message: `Welcome back ${firstname}`,
          token,
          user,
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getUserById(req, res) {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'user not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },

  async getUserByEmail(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.params.email]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'user not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async verifyUser(req, res) {
    const finduser = 'SELECT * FROM users WHERE email = $1';
    const updateUser = 'UPDATE users SET status=$1 WHERE email=$2 returning *';
    try {
      const { rows } = await db.query(finduser, [req.params.email]);

      // if (!row[0]) {
      //   return res.status(404).send(404,'User not found');
      // }
      if (!validator.isValidUserStatus(rows[0].status)) {
        return 'status can either be "verified or unverified"';
      }
      const values = [
        req.body.status,
        req.params.email,
      ];
      const response = await db.query(updateUser, values);
      return res.status(200).send(response.rows[0]);
    } catch (error) {
      return res.status(400).send(400, error.message);
    }
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  // getOneUser(req, res) {
  //   const user = UserModel.findAUser(req.params.id);
  //   if (!user) {
  //     return res.status(404).send({ message: 'user not found' });
  //   }
  //   return res.status(200).send(user);
  // },

};

export default User;
