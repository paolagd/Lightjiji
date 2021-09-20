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

  const queryParams = [];
  let queryString = `UPDATE Products `;

  if(newValues.name){
    queryParams.push(newValues.name);
    queryString += `SET name = $${queryParams.length} `;
  }
  if(newValues.description){
    queryString+= queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.description);
    queryString += `description = $${queryParams.length} `;
  }
  if(newValues.price){
    queryString+= queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.price);
    queryString += `price = $${queryParams.length} `;
  }
  if(newValues.is_featured){
    queryString+= queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.is_featured);
    queryString += `is_featured = $${queryParams.length} `;
  }
  if(newValues.image_url){
    queryString+= queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.image_url);
    queryString += `image_url = $${queryParams.length} `;
  }
  if(newValues.category){
    queryString+= queryParams.length === 0 ? `SET ` : `, `;
    queryParams.push(newValues.category);
    queryString += `category_id = $${queryParams.length} `;
  }

  queryParams.push(productId);
  queryString += `WHERE id = $${queryParams.length} `;
  console.log(queryString)

  return db.query(queryString, queryParams)
    .then(res => console.log(res.rowCount))
    .catch(err => console.log(err.message));
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
