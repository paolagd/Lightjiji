const db = require('./db-connect');

//H
const getProductsSatisfying = filters => {

};

//H
const createProductListing = product => {
  // product - {  seller_id, category_id, name, price, created_on, is_sold, is_featured, image_url }
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