const express = require('express');
const router = express.Router();
const productQueries = require('../lib/products');
const categoryQueries = require('../lib/categories');
const favouriteQueries = require('../lib/favourites');
const timeago = require('timeago.js');
const { requireLogin } = require('./routeHelper');

//GET /api/products

router.get('/', (req, res) => {
  const userId = req.session.user_id;
  req.query.userId = userId;

  let productsPromise = productQueries.getProductsSatisfying(req.query);
  let categories = categoryQueries.getAllCategories();

  Promise.all([productsPromise, categories])
    .then(result => {
      const templateVars = {
        products: result[0],
        categories: result[1],
        user: userId
      };
      res.render('product-listings', templateVars);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });
});

//POST /api/products

router.post('/', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.status(401).send('User not found')
    return;
  }
  console.log(req.body);
  productQueries.createProductListing({ ...req.body, seller_id: userId })
    .then(product => {
      res.redirect("/api/products/myListings");
    })

    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});


//Get My Listings
router.get('/myListings', requireLogin);
router.get('/myListings', (req, res) => {
  const userId = req.session.user_id;

  const filters = {
    seller_id: userId
  }

  let productsPromise = productQueries.getProductsSatisfying(filters);
  let categories = categoryQueries.getAllCategories();

  Promise.all([productsPromise, categories])
    .then(result => {
      const templateVars = {
        user: userId,
        products: result[0],
        categories: result[1],
        timeago
      }

      res.render('listings', templateVars);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});

//Get favorites
router.get('/favourites', requireLogin);
router.get('/favourites', (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    res.status(401).send('User not found')
    return;
  }

  favouriteQueries.getUserFavourites(userId)
    .then(products => {
      const templateVars = {
        user: userId,
        products,
        timeago
      }

      res.render('favorites', templateVars);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});


// GET /products/:product_id
router.get("/:product_id", (req, res) => {
  const userId = req.session.userId;

  productQueries.getProductById(req.params.product_id)
    .then(product => {
      const templateVars = { user: userId, product, timeago }
      res.render('review-products', templateVars);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});

// PUT /products/:product_id
router.put("/:product_id", (req, res) => {
  const productId = req.params.product_id;
  const newValues = req.body;

  productQueries.updateProductListing(productId, newValues)
    .then(product => {
      res.json({ product });
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});

// PUT /products/:product_id/sold
router.put("/:product_id/sold", (req, res) => {
  const productId = req.params.product_id;

  productQueries.markSoldProductListing(productId)
    .then(product => {
      res.json({ product });
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});

// DELETE /products/:product_id
router.delete("/:product_id", (req, res) => {
  const productId = req.params.product_id;

  productQueries.deleteProductListing(productId)
    .then(product => {
      res.json({ product });
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});


// PUT /products/unfavourite:product_id
router.put("/:product_id/unfavourite", (req, res) => {
  const productId = req.params.product_id;
  const userId = req.session.user_id;

  if (!userId) {
    res.status(401).send('User not found')
    return;
  }

  favouriteQueries.unfavouriteProduct(productId, userId)
    .then(product => {
      res.json({ product });
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});


// PUT /products/favourite:product_id
router.put("/:product_id/favourite", (req, res) => {
  const productId = req.params.product_id;
  const userId = req.session.user_id;

  if (!userId) {
    res.status(401).send('User not found')
    return;
  }

  favouriteQueries.favouriteProduct(productId, userId)
    .then(product => {
      res.json({ product });
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});

module.exports = router;
