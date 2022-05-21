const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NULL,
    address VARCHAR(150) NULL,
    is_Admin BOOLEAN,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const createTableProperties = `
CREATE TABLE IF NOT EXISTS properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner INT,
    status VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    state VARCHAR(50) NULL,
    city VARCHAR(50)  NULL ,
    address VARCHAR(255)  NULL,
    type VARCHAR(255) NULL,
    image_url VARCHAR(1150) NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (owner) REFERENCES users(id)
)
`;

const createNewProperty = `
INSERT INTO properties VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
`;

const findPropertyById = `
SELECT * FROM properties WHERE id = ?
`;

const updateProperty = `
UPDATE properties SET ? WHERE id = ?
`;

const soldProperty = `
UPDATE properties SET status = ? WHERE id = ?
`

const deleteProperty = `
DELETE FROM properties WHERE id = ?
`
module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    createTableProperties,
    createNewProperty,
    findPropertyById,
    updateProperty,
    soldProperty,
    deleteProperty
};
