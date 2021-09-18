const db = require('./db-connect');

const getUserByEmail = email => {
  return db
    .query("SELECT * FROM Users WHERE email = $1", [email])
    .catch(error => 'User not found!');
};

const getUserById = id => {
  return db
    .query("SELECT * FROM Users WHERE id = $1", [id])
    .catch(error => 'User not found!');
};

module.exports = {
  getUserByEmail,
  getUserById,
};