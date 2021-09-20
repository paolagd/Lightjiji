const db = require('./db-connect');

//H
const getProductsSatisfying = filters => {
  // filters - {minimum_price , maximun_price, category_id, is_featured}
  const queryParams = [];
  //We can use this to display all the products on the main page when no filters are specified
  let queryString = `SELECT *
   FROM Products`;

   if (filters.seller_id) {
     queryParams.push(`${filters.seller_id}`);
     queryString += `WHERE seller_id = $${queryParams.length}`;
   }
   if (filters.minimum_price) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`${filters.minimum_price}`);
    queryString += `WHERE price >= $${queryParams.length}`;
  }
  if (filters.maximum_price) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`${filters.maximum_price}`);
    queryString += `WHERE price <= $${queryParams.length}`;
  }
  if (filters.category_id) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`${filters.category}`);
    queryString += `WHERE category_id= $${queryParams.length}`;
  }
  if (filters.is_featured) {
    (queryParams.length === 0) ? queryString += ` WHERE`: queryString += ` AND`;
    queryParams.push(`${filters.is_featured}`);
    queryString += `WHERE is_featured = $${queryParams.length}`;
  }

  queryString += `
  ORDER BY products.created_on DESC`

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => err.message);

};

//H
const createProductListing = product => {
  // product - {  seller_id, category_id, name, price, created_on, is_sold, is_featured, image_url }
  const queryString = `INSERT INTO Products (seller_id, category_id, name, description, price, is_sold, is_featured, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const values = [product.seller_id, product.category_id, product.name, product.description, product.price, product.is_sold, product.is_featured, product.image_url];

  return db.query(queryString, values)
  .then(result => result.rows[0])
  .catch(err => err.message);
};

///PAOLA
const updateProductListing = (productId, newValues) => {

  const queryParams = [];
  let queryString = `UPDATE Products`;

  if(newValues.name){
    queryParams.push(newValues.name);
    queryString += `SET name = $${queryParams.length} `;
  }
  if(newValues.description){
    queryParams.push(newValues.description);
    queryString += `SET description = $${queryParams.length} `;
  }
  if(newValues.price){
    queryParams.push(newValues.price);
    queryString += `SET price = $${queryParams.length} `;
  }
  if(newValues.is_featured){
    queryParams.push(newValues.is_featured);
    queryString += `SET is_featured = $${queryParams.length} `;
  }
  if(newValues.image_url){
    queryParams.push(newValues.image_url);
    queryString += `SET image_url = $${queryParams.length} `;
  }

  queryParams.push(productId);
  queryString += `WHERE id = $${queryParams.length} `;
  console.log(queryString)

  return db.query(queryString, queryParams)
    .then(res => console.log(res))
    .catch(err => err.message);
};

const getProductById = id => {
  const queryString = 'SELECT * FROM Products WHERE id = $1';
  return db.query(queryString, [id])
    .then(res => res.rows[0])
    .catch(err => err.message);
};


// UPDATE Products
//    SET name='Toyota RAV4 (Need gone fast, definitely not a scam!)',
//    SET description='RAV4 needing minor repairs, with relatively low mileage, will miss when gone.',
//    SET price=350000,
//    SET is_featured=true,
//    SET image_url='https://i.ebayimg.com/images/g/Mf0AAOSwK9VhQzYo/s-l640.webp'
//  WHERE id=3;


// ---Mark product as SOLD

// UPDATE Products
// SET is_sold = TRUE
// WHERE id = 1;




const deleteProductListing = id => {

};

module.exports = {
  getProductsSatisfying,
  createProductListing,
  updateProductListing,
  getProductById,
  deleteProductListing
};
