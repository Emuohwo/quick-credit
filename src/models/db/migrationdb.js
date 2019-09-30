// import pool from '../../config/config';
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createRepayments = async () => {
    await pool.query(`
        CREATE TABLE repayments(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            createdon TIMESTAMP NOT NULL DEFAULT NOW(),
            loanid UUID NOT NULL,
            amount NUMERIC(10, 2) DEFAULT 0.00
        );
        
    `)
    .then((res) => {
        console.log(res)
        pool.end();
    })
    .catch ((err) => {
        console.log(err.message);
    }); 
}

const createUsers = async () => {
    const userQuery = `
    CREATE TABLE users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'unverified',
        isadmin BOOLEAN NOT NULL DEFAULT false,
        createdon TIMESTAMP NOT NULL DEFAULT NOW()
    )
    `;
    await pool.query(userQuery)
    .then((res) => {
        console.log(res);
    })
    .catch ((error) => {
        console.log(error.message);
    })
}

const createLoans = async () => {
    const loanQuery = `
    CREATE TABLE IF NOT EXISTS 
    loans(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        useremail VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        createdon TIMESTAMP NOT NULL DEFAULT NOW(),
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        repaid BOOLEAN NOT NULL DEFAULT false,
        tenor SMALLINT NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        paymentinstallment NUMERIC(10, 2) NOT NULL,
        balance NUMERIC(10, 2) NOT NULL,
        interest NUMERIC(10, 2) NOT NULL
    )
    `;
    await pool.query(loanQuery)
    .then((res) => {
        console.log(res);
    })
    .catch ((error) => {
        console.log(error.message);
    })
}

const createAdmin = async () => {
    const adminQuery = `
    INSERT INTO users (
        id, email, firstname, lastname, address, password, status, isadmin
    ) VALUES (
        'ca6b7e7e-65d9-4bca-a5dc-76572dd97435',
        'isaac@ewarri.com',
        'Isaac',
        'Warri',
        '120 Lagos-Ibadan ExpressWay',
        '$2b$08$DPJMyv4DkeuMjYys0/91m.3eyA6HPPSFk/K6gpq6Vd4zBS3XrKu3',
        'verified',
        true
    )
    `;
    await pool.query(adminQuery)
    .then((res) => {
        console.log(res);
    })
    .catch ((error) => {
        console.log(error.message);
    })
}

createUsers();
createLoans();
createAdmin();
createRepayments();
// export default createTables;