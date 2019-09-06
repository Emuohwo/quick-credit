const chai = require( 'chai');
const server = require ('../../server');


describe('Get Home Route', () => {
    it('It should return Welcome to Quick Loan', () => {
        expect('Welcome to Quick Credit').to.equal('Welcome to Quick Credit');
    })
})