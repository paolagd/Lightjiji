const express = require('express');
const router = express.Router();
const productQueries = require('../lib/products');

//GET /api/products

router.get('/', (req, res) => {
  productQueries.getProductsSatisfying(req.query)
    .then(products => res.json({ products }))
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

//POST /api/products

router.post('/', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.error("The user doesn't exist;");
    return;
  }

  productQueries.createProductListing({ ...req.body, seller_id: userId })
    .then(product => res.json({ product }))
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

// GET /products/:product_id
router.get("/:product_id", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.error("The user doesn't exist;");
    return;
  }
  productQueries.getProductById(req.params.product_id)
    .then(product => {
      res.json({ product });
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

// PUT /products/:product_id
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


module.exports = router;
