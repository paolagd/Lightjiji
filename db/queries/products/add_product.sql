--POST  /api/products - create product
INSERT INTO Products (seller_id, category_id, name, description, price, is_sold, is_featured, image_url)
VALUES (
  4,
  8,
  'Toyota RAV4 (2006 - 2013)',
  'RAV4 needing mechanical repairs, with higher mileage, no longer need or use,',
  400000,
  FALSE,
  FALSE,
  'https://i.ebayimg.com/images/g/Se8AAOSwTnxhQzYn/s-l640.webp'
);
