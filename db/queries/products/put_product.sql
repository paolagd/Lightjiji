--PUT    /api/products/:product_id - modify product
UPDATE Products
   SET name='Toyota RAV4 (Need gone fast, definitely not a scam!)',
   description='RAV4 needing minor repairs, with relatively low mileage, will miss when gone.',
   price=350000,
   is_featured=true,
   image_url='https://i.ebayimg.com/images/g/Mf0AAOSwK9VhQzYo/s-l640.webp'
 WHERE id=1;


---Mark product as SOLD

UPDATE Products
SET is_sold = TRUE
WHERE id = 1;
