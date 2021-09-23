#!/usr/bin/env sh

./gen_product_seeds.py \
  --product-name laptop \
  --max-results 15 \
  --seller-id 1 \
  --category-id 1

./gen_product_seeds.py \
  --product-name shoes \
  --max-results 15 \
  --seller-id 1 \
  --category-id 7

./gen_product_seeds.py \
  --product-name car \
  --max-results 15 \
  --seller-id 2 \
  --category-id 8

./gen_product_seeds.py \
  --product-name cabinet \
  --max-results 15 \
  --seller-id 4 \
  --category-id 2

./gen_product_seeds.py \
  --product-name couch \
  --max-results 15 \
  --seller-id 4 \
  --category-id 2

./gen_product_seeds.py \
  --product-name macbook \
  --max-results 15 \
  --seller-id 5 \
  --category-id 1