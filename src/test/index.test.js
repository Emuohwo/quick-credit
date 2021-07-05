import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
/* eslint-env mocha */
chai.should();
chai.use(chaiHttp);
describe('Get Home Route', () => {
  it('It should return Welcome to Quick Loan', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
