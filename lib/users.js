const db = require('./db-connect');

const getUserByEmail = email => {
  return db
    .query("SELECT * FROM Users WHERE email = $1", [email])
    .then(result => result.rows[0] || null)
    .catch(error => 'Internal SQL error!');
};

const getUserById = id => {
  return db
    .query("SELECT * FROM Users WHERE id = $1", [id])
    .then(result => result.rows[0] || null)
    .catch(error => 'Internal SQL error!');
};

module.exports = {
  getUserByEmail,
  getUserById,
};