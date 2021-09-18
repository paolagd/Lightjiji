--GET    /api/products - show all products (optional get params = the different filters)
--we need to select all products that have a price in a certain range, have a certain category, is featured, and has a certain seller

SELECT *
FROM Products
WHERE
  price >= 1000
  AND price <= 200000
  AND is_featured = false
  AND category_id = 1
  AND is_sold = false;

