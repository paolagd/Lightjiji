const db = require('./db-connect');

const getUserFavourites = userId => {

  const queryString = `SELECT Products.* , Favourites.id as favourite_id
  FROM favourites
  JOIN Products ON Products.id = product_id
  WHERE user_id = $1;`;

  return db.query(queryString, [userId])
          .then(res => res.rows)
          .catch(err => err.message);
}

const markSoldProductListing = id => {
  const queryString = 'UPDATE Products SET is_sold = TRUE WHERE id = $1';
  return db.query(queryString, [id])
    .then(res => {
      if (res.rowCount === 1) {
        return id;
      }
      throw new Error('Error: please review request');
    })
    .catch(err => err.message);
};

module.exports = {
  getUserFavourites
}
