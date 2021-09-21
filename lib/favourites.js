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

  console.log(productId)
  console.log(userId)

  const queryParams = [
    userId,
    productId
  ];

  return db.query(queryString, queryParams)
    .then(res => {
      console.log("hello: ", res)
      if (res.rowCount === 1) {
        return id;
      }
      throw new Error('Error: please review request');
    })
    .catch(err => err.message);
};

module.exports = {
  getUserFavourites,
  unfavouriteProduct
}
