--PUT    /api/products/:product_id - modify product
UPDATE Products
   SET name='Toyota RAV4 (Need gone fast, definitely not a scam!)',
   SET description='RAV4 needing minor repairs, with relatively low mileage, will miss when gone.',
   SET price=350000,
   SET is_featured=true,
   SET image_url='https://i.ebayimg.com/images/g/Mf0AAOSwK9VhQzYo/s-l640.webp'
 WHERE id=3;


---Mark product as SOLD

UPDATE Products
SET is_sold = TRUE
WHERE id = 1;
