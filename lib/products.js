const db = require('./db-connect');

const getProductById = id => {
  const queryString = 'SELECT * FROM Products WHERE id = $1';

  return db.query(queryString, [id])
    .then(res => res.rows[0])
    .catch(err => err.message);
};

const getProductsSatisfying = filters => {
  // filters - {minimum_price , maximun_price, category, is_featured}
  const queryParams = [];

  let queryString = `SELECT Products.*
   FROM Products WHERE TRUE`;

  //if the user is logged in, check if products are favorites to show favorite button
  if (filters.userId) {
    queryParams.push(filters.userId);
    queryString = `
    SELECT DISTINCT Products.id, Products.*, Favourites.id as favourite
    FROM Products
    LEFT JOIN Favourites ON Products.id = Favourites.product_id AND Favourites.user_id = $${queryParams.length} WHERE TRUE`;
  }

  // for My Listings - seller id will retrieve only listings that belong to the current user
  if (filters.seller_id) {
    queryParams.push(`${filters.seller_id}`);
    queryString += ` AND seller_id = $${queryParams.length}`;
  }

  if (filters.searchTerm) {
    queryParams.push(`%${filters.searchTerm.toLowerCase()}%`);
    queryString += ` AND (LOWER(name) LIKE $${queryParams.length} OR LOWER(description) LIKE $${queryParams.length})`;
  }

  if (filters.minimum_price) {
    queryParams.push(filters.minimum_price * 100);
    queryString += ` AND price >= $${queryParams.length}`;
  }
  if (filters.maximum_price) {
    queryParams.push(filters.maximum_price * 100);
    queryString += ` AND price <= $${queryParams.length}`;
  }
  if (filters.category) {
    queryParams.push(`${filters.category}`);
    queryString += ` AND category_id= $${queryParams.length}`;
  }
  if (filters.is_featured) {
    queryParams.push(`${filters.is_featured}`);
    queryString += ` AND is_featured = $${queryParams.length}`;
  }

  queryString += `
  ORDER BY Products.id DESC`;

  //if the query fails the catch will be handled in the route
  return db.query(queryString, queryParams)
    .then(result => result.rows);

};

const createProductListing = product => {
  // product - {  seller_id, category_id, name, price, created_on, is_sold, is_featured, image_url }
  const queryString = `INSERT INTO Products (seller_id, category_id, name, description, price, is_sold, is_featured, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const values = [product.seller_id, product.category_id, product.name, product.description, product.price * 100, product.is_sold, product.is_featured, product.image_url];

  return db.query(queryString, values)
    .then(result => result.rows[0])
    .catch(err => err.message);
};

const updateProductListing = (productId, newValues) => {

  const queryParams = [];
  let queryString = `UPDATE Products `;

  if (newValues.name) {
    queryParams.push(newValues.name);
    queryString += `SET name = $${queryParams.length} `;
  }
  if (newValues.description) {
    queryString += queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.description);
    queryString += `description = $${queryParams.length} `;
  }
  if (newValues.price) {
    queryString += queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.price * 100);
    queryString += `price = $${queryParams.length} `;
  }
  if (newValues.is_featured) {
    queryString += queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.is_featured);
    queryString += `is_featured = $${queryParams.length} `;
  }
  if (newValues.image_url) {
    queryString += queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.image_url);
    queryString += `image_url = $${queryParams.length} `;
  }
  if (newValues.category) {
    queryString += queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.category);
    queryString += `category_id = $${queryParams.length} `;
  }

  queryParams.push(productId);
  queryString += `WHERE id = $${queryParams.length} `;

  return db.query(queryString, queryParams)
    .then(res => {
      if (res.rowCount === 1) {
        return productId;
      }
      throw new Error('Error: please review request');
    })
    .catch(err => console.log(err.message));
};

//Marks product as SOLD
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

const deleteProductListing = id => {
  const queryString = 'DELETE FROM Products WHERE id = $1;';

  return db.query(queryString, [id])
    .then(res => res.rowCount)
    .catch(err => err.message);
};

module.exports = {
  getProductsSatisfying,
  createProductListing,
  updateProductListing,
  getProductById,
  deleteProductListing,
  markSoldProductListing
};
