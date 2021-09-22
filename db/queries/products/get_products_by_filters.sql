--GET    /api/products - show all products (optional get params = the different filters)
--we need to select all products that have a price in a certain range, have a certain category, is featured, and has a certain seller

SELECT DISTINCT Products.id, Products.*, Favourites.id as favourite
FROM Products
LEFT JOIN Favourites ON Products.id = Favourites.product_id AND Favourites.user_id = 1
-- WHERE
--   price >= 100
--   AND price <= 200000
--   AND is_featured = false
--  -- AND category_id = 1
--   AND is_sold = false
  ORDER BY Products.id DESC;





sELECT DISTINCT Products.id, Products.*, Favourites.id as favourite
    FROM Products
    LEFT JOIN Favourites ON Products.id = Favourites.product_id AND Favourites.user_id = 1
  ORDER BY Products.id DESC
