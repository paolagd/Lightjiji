const db = require('./db-connect');

//H
const getProductsSatisfying = filters => {
  // filters - {minimum_price , maximun_price, category_id, is_featured}
  const queryParams = [];
  //We can use this to display all the products on the main page when no filters are specified
  const queryString = `SELECT *
   FROM Products`;

   if (filters.minimum_price) {
    queryParams.push(`%${filters.minimum_price}%`);
    queryString += `WHERE price >= $${queryParams.length}`;
  }
  if (filters.maximum_price) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`%${filters.maximum_price}%`);
    queryString += `WHERE price <= $${queryParams.length}`;
  }
  if (filters.category_id) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`%${filters.category}%`);
    queryString += `WHERE category_id= $${queryParams.length}`;
  }
  if (filters.is_featured) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`%${filters.is_featured}%`);
    queryString += `WHERE is_featured = $${queryParams.length}`;
  }

  return db.query(queryString, queryParams).then(result = result.rows);

};

//H
const createProductListing = product => {
  // product - {  seller_id, category_id, name, price, created_on, is_sold, is_featured, image_url }
  const queryString = `INSERT INTO Products (seller_id, category_id, name, description, price, is_sold, is_featured, image_url)
  VALUES ($1, 42, $3, $4, $5, $6, $7, $8)RETURNING *
  `;

  const values = [product.seller_id, product.category_id, product.name, product.description, product.price, product.is_sold, product.is_featured, product.image_url]

  return db.query(queryString, values).then(result => result);
};

///PAOLA
const updateProductListing = (productId, newValues) => {

};

///PAOLA
const getProductById = id => {
  const queryString = 'SELECT * FROM Products WHERE id = $1';
  return db.query(queryString, [id])
    .then(res => res.rows[0])
    .catch(err => err.message);
};

const deleteProductListing = id => {

};

module.exports = {
  getProductsSatisfying,
  createProductListing,
  updateProductListing,
  getProductById,
  deleteProductListing
};
