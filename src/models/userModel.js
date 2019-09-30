// import uuid from 'uuid';
import passwordHelper from '../helpers/password';
import pool from '../config/config';

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
  async createUser(formData) {
    const queryString = `INSERT INTO ${this.users} ( email, firstname, lastname, password, address) VALUES($1, $2, $3, $4, $5, $6) returning *`
  }

  // async signUpUser(signupData) {
  //   const id = uuid();
  //   const password = passwordHelper.passwordHash(signupData.password)
  //   const { email, firstname, lastname, password, address, status,  isadmin, createdon } = signupData;
  //   try {
  //     const { rows } = await this.users.insert(
  //       'id, email, firstname, lastname, password, address', '$1, $2, $3, $4, $5, $6',
  //       [
  //         id, email, firstname, lastname, password, address
  //       ],
  //     );
  //     this.users.push(rows[0]);
  //     return rows[0];
  //   } catch (error) {
  //     throw error
  //   }
    
  // }

  
  // findUserById(id) {
  //   try {
  //     const { rows } = await this
  //   }
  //   return this.users.find((user) => user.id === id);
  // }

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
