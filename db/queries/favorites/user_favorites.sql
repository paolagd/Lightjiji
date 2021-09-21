SELECT Products.* , Favourites.id as favourite_id FROM favourites
JOIN Products ON Products.id = product_id
WHERE user_id = 1;
