const db = require('./db-connect');

const getUserByEmail = email => {
  return db
    .query("SELECT * FROM Users WHERE email = $1", [email])
    .then(result => result.rows[0] || null)
    .catch(() => 'Internal database error!');
};

const getUserById = id => {
  return db
    .query("SELECT * FROM Users WHERE id = $1", [id])
    .then(result => result.rows[0] || null)
    .catch(() => 'Internal database error!');
};

const createUser = ({ firstName, lastName, phoneNumber, password, email, profile_pic_url }) => {
  const queryString = `
  INSERT INTO Users (first_name, last_name, phone_number, password, email, profile_pic_url)
       VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  return db
    .query(queryString, [firstName, lastName, phoneNumber, password, email, profile_pic_url])
    .then(result => result.rows[0] || null)
    .catch(() => 'Internal database error!');
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser
};
