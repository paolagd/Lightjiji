const express = require('express');
const router = express.Router();
const productQueries = require('../lib/products');
const favouriteQueries = require('../lib/favourites');

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
