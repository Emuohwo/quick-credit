import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp)
describe('Get Home Route', () => {
    it('It should return Welcome to Quick Loan', () => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            expect('Welcome to Quick Credit').to.equal('Welcome to Quick Credit');
            res.should.have.status(200);
            done();
        })
    })
})