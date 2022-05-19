const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(50) NULL,
    address VARCHAR(255) NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 1
)
`;

const createNewUser = `
INSERT INTO user VALUES(null, ?, ?, ?, ?, NOW(), ?, ?, true)
`;

const findUserByEmail = `
SELECT * FROM user WHERE email = ?
`;


module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
   
};
