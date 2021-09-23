#!/usr/bin/env python
from argparse import ArgumentParser
from bs4 import BeautifulSoup
import sys
import requests

PRODUCTS_PER_PAGE = 40
DEFAULT_REGION = 'b-city-of-toronto'
INSERT_PRODUCT_SQL_FORMAT = '''
INSERT INTO Products (seller_id, category_id, name, description, price, is_sold, is_featured, image_url)
VALUES ({seller_id}, {category_id}, '{name}', '{description}', {price}, {is_sold}, {is_featured}, '{image_url}');
'''.strip()
SEARCH_URL_FORMAT = 'https://www.kijiji.ca/{region}/{search_term}/page-{page_number}/k0l1700273'

def scrape_product_element(product_element):
  price_text = product_element.find('div', class_='price').get_text(strip=True)
  price = int(price_text.replace('$', '').replace(',', '').replace('.', ''))

  name = product_element.find('div', class_='title').get_text(strip=True)
  description = product_element.find('div', class_='description').get_text(strip=True)

  image_url = product_element.select_one('.image img')['data-src']

  return  {
    'name': name,
    'description': description,
    'price': price,
    'image_url': image_url
  }

def scrape_products(product_name, max_num_products, region):
  search_url = SEARCH_URL_FORMAT.format(
    search_term=product_name,
    region=region,
    page_number=1
  )

  response = requests.get(search_url)
  soup = BeautifulSoup(response.content, features='html5lib')

  search_results = soup.find_all('div', class_='search-item')
  for idx, search_result in enumerate(search_results):
    if idx >= max_num_products:
      break

    try:
      yield scrape_product_element(search_result)
    except:
      pass

def escape_str(s):
  return s.replace("'", "''")

if __name__ == '__main__':
  parser = ArgumentParser()
  parser.add_argument('--product-name', type=str, required=True)
  parser.add_argument('--max-results', type=int, default=PRODUCTS_PER_PAGE)
  parser.add_argument('--seller-id', type=int, required=True)
  parser.add_argument('--category-id', type=int, required=True)
  parser.add_argument('--region', type=str, default=DEFAULT_REGION)
  args = parser.parse_args()

  if args.max_results > PRODUCTS_PER_PAGE:
    print(f'Results across multiple pages not supported. Defaulting max results to {PRODUCTS_PER_PAGE}.',
          file=sys.stderr)
    args.max_results = PRODUCTS_PER_PAGE

  for product in scrape_products(args.product_name, args.max_results, region=args.region):
    print(INSERT_PRODUCT_SQL_FORMAT.format(
      name=escape_str(product['name']),
      description=escape_str(product['description']),
      price=product['price'],
      image_url=product['image_url'],
      seller_id=args.seller_id,
      category_id=args.category_id,
      is_sold=False,
      is_featured=False
    ))