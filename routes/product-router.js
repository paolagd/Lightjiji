const express = require('express');
const router = express.Router();
const productQueries = require('../lib/products');
const categoryQueries = require('../lib/categories');

//GET /api/products

router.get('/', (req, res) => {

  let productsPromise = productQueries.getProductsSatisfying(req.query);
  let categories = categoryQueries.getAllCategories();

  Promise.all([productsPromise, categories])
    .then(result => {
      const templateVars = {
        products : result[0],
        categories : result[1]
      };

      res.render('product-listings', templateVars);
    })
    .catch(errorMessage => {
      console.log(errorMessage)
      res.status(500).json({ error: errorMessage });
    });
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
