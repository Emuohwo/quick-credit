import UserModel from '../models/userModel';
import generateToken from '../helpers/token';
import validator from '../helpers/validRegex';

const User = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  signUpUser(req, res) {
    if(!validator.isValidEmail(req.body.email)) {
      return res.status(400).send('Invalid email. Please check your spellings!')
    }
    
    if(validator.noEmptySpaces(req.body.email)) {
      return res.status(400).send('Invalid email. Spaces are not allowed before or after email!')
    }

    // if(!validator.isValidUserStatus(req.body.status)) {
    //   return res.status(400).send('Invalid input. Input must be "verified or unverifed"')
    // }
    if (!req.body.email || !req.body.firstname
        || !req.body.lastname || !req.body.password
        || !req.body.address) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const user = UserModel.signUpUser(req.body);
    const token = generateToken(user.id, user.isadmin)
    return res.status(201).send({
      status: 201,
      data: [{
        token: token,
        user: user,
      }],
    });
  },
  // logInUser(req, res) {
  //   if (!req.body.email && !req.body.password) {
  //     return res.status(400).send({ message: 'All fields are required' });
  //   }
  //   const user = UserModel.logInUser(req.body);
  //   // const token = generateToken(user.id, user.isadmin)
  //   return res.status(201).send({
  //     status: 200,
  //     data: [{
  //       // token: token,
  //       user: user,
  //     }]
  //   });
  // },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllUsers(req, res) {
    const users = UserModel.findAllUsers();
    return res.status(200).send(users);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getOneUser(req, res) {
    const user = UserModel.findAUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(200).send(user);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated user
     */
  updateUser(req, res) {
    const user = UserModel.findAUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    const updatedUser = UserModel.updateAUser(req.params.id, req.body);
    return res.status(200).send(updatedUser);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return statuc code 204
     */
  deleteUser(req, res) {
    const user = UserModel.findAUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    const ref = UserModel.deleteUser(req.params.id);
    return res.status(204).send(ref);
  },
};

export default User;
