const db = require('./db-connect');

const getAllCategories = () => {
  const queryParams = 'SELECT * FROM categories;';

  return db.query(queryParams)
    .then(categories => categories.rows)
    .catch(err => err.message);

};

module.exports = { getAllCategories };
