import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
/* eslint-env mocha */
chai.should();
chai.use(chaiHttp);



const validUser = {
    "email": " Mikegold@gmail.com",
    "firstname": "Mike",
    "lastname": "Gold",
    "password": "Mike",
    "address": "11a, lagos, Nigeria",
    status: 'verified',
    "isadmin": false
}

const wrongUserEmailformat = {
    email: 'Mikegold@gmailcom ',
    firstname: 'Mike',
    lastname: 'Gold',
    password: 'Mike',
    address: '11a, lagos, Nigeria',
    status: 'verified',
    isadmin: false
}

const userWithNoFirstname = {
    email: 'Mikegold@gmailcom',
    lastname: 'Gold',
    password: 'Mike',
    address: '11a, lagos, Nigeria',
    status: 'verified',
    isadmin: false
}

const userWithNoPassword = {
    email: " Mikegold@gmail.com",
    firstname: "Mike",
    lastname: "Gold",
    address: "11a, lagos, Nigeria",
    status: 'verified',
    isadmin: false
}

const invalidUserStatus = {
    email: " Mikegold@gmail.com",
    firstname: "Mike",
    lastname: "Gold",
    address: "11a, lagos, Nigeria",
    status: 'alive',
    isadmin: false
}

describe('Create a User', () =>{

    it('should return a success status 201 when submitted', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(validUser)
          .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });

    it('should return a bad request status 400 when submitted, wrong email format', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(wrongUserEmailformat)
          .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });
    

    it('should return a bad request status 400 when submitted, for no firstname', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(userWithNoFirstname)
          .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });

    it('should return a bad request status 400 when submitted, for no password', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(userWithNoPassword)
          .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });
    
    it('should return a bad request status 400 when submitted, for invalid Status', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(invalidUserStatus)
          .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });

    
})
