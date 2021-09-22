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

const unfavouriteProduct = (productId, userId) => {
  const queryString = 'DELETE FROM Favourites WHERE user_id = $1 AND product_id = $2;';

  const queryParams = [
    userId,
    productId
  ];

  return db.query(queryString, queryParams)
    .then(res => {
      if (res.rowCount === 1) {
        return id;
      }
      throw new Error('Error: please review request');
    })
    .catch(err => err.message);
};

const favouriteProduct = (productId, userId) => {
  const queryString = 'INSERT INTO Favourites (user_id, product_id) VALUES  ($1, $2)  RETURNING *';

  const queryParams = [
    userId,
    productId
  ];

  return db.query(queryString, queryParams)
    .then(result => result.rows[0])
    .catch(err => err.message);
};


module.exports = {
  getUserFavourites,
  unfavouriteProduct,
  favouriteProduct
}
