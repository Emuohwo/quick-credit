import UserModel from '../models/userModel';

const User = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  signUpUser(req, res) {
    if (!req.body.email && !req.body.firstname
        && !req.body.lastname && !req.body.password
        && !req.body.address
        && !req.body.isadmin) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const user = UserModel.signUpUser(req.body);
    return res.status(201).send(user);
  },
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
