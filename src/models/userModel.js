import uuid from 'uuid';
import passwordHelper from '../helpers/password';

class User {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.users = [];
  }

  /**
   *
   * @returns {object} user object
   */
  signUpUser(data) {
    const newUser = {
      id: uuid.v4(),
      email: data.email || '',
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      password: passwordHelper.passwordHash(data.password),
      address: data.address || '',
      status: 'unverified' || validator.isValidUserStatus('verified'),
      isadmin: data.isadmin || '',
    };
    
    this.users.push(newUser);
    return newUser;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} user object
   */
  findAUser(id) {
    return this.users.find((user) => user.id === id);
  }

  findAUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  // logInUser(email, password) {
  //   const aUser = 'SELECT * FROM this.users WHERE email = $1';
  //   const foundUser = this.findAUserByEmail(email);
  //   if (foundUser  && passwordHelper.comparePasswords(password, foundUser.password)) {
  //     return foundUser;
  //   }
  // }

  /**
   * @returns {object} returns all users
   */
  findAllUsers() {
    return this.users;
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  updateAUser(id, data) {
    const user = this.findAUser(id);
    const index = this.users.indexOf(user);
    this.users[index].email = data.email || user.email;
    this.users[index].firstname = data.firstname || user.firstname;
    this.users[index].lastname = data.lastname || user.lastname;
    this.users[index].password = data.password || user.password;
    this.users[index].address = data.address || user.address;
    this.users[index].status = data.status || user.status;
    this.users[index].isadmin = data.isadmin || user.isadmin;
    return this.users[index];
  }

  /**
   *
   * @param {uuid} id
   */
  deleteUser(id) {
    const user = this.findAUser(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return {};
  }
}
export default new User();
