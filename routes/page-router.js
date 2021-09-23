const express = require('express');
const router = express.Router();
const {
  getAllUserConversations,
  sendMessage
} = require("../lib/messages");
const { getUserById } = require('../lib/users');
const productQueries = require('../lib/products');
const favouriteQueries = require('../lib/favourites');
const categoryQueries = require('../lib/categories');
const { requireLogin } = require("./routeHelper");
const timeago = require('timeago.js');
const moment = require('moment');

router.get("/", (req, res) => {
  res.redirect("/products");
});

// LOGIN
router.get('/login/:id', (req, res) => {
  // cookie-session
  req.session.user_id = req.params.id;

  // redirect the client
  res.redirect('/');
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

router.get("/messages", requireLogin);
router.get("/messages", (req, res) => {
  getAllUserConversations(req.user.id)
    .then(conversations => Promise.all(conversations.map(convo => {
      const { other_id, author_id } = convo;
      return Promise
        .all([getUserById(other_id), getUserById(author_id)])
        .then(([other, author]) => ({
          ...convo,
          other,
          author,
          time_sent: moment(convo.time_sent).fromNow()
        }));
    }))).then(conversations => {
      res.render("conversation-list", { user: req.user, conversations });
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    })
});

router.get("/messages/:other_id", requireLogin);
router.get("/messages/:other_id", (req, res) => {
  const otherUserID = req.params.other_id;

  getUserById(otherUserID)
    .then(otherUser => {
      if (!otherUser) {
        res.status(401).send('User not found');
        return;
      }

      res.render("conversation", { user: req.user, other: otherUser });
    });
});

router.post("/messages/:other_id", (req, res) => {
  const fromUserId = req.session.user_id;
  const toUserId = req.params.other_id;
  const messageContent = req.body.message;

  sendMessage(fromUserId, toUserId, messageContent)
    .then(() => {
      res.redirect(`/messages/${toUserId}`);
    });
});

//GET products

router.get('/products', (req, res) => {
  const userId = req.session.user_id;
  const searchTerm = req.query.q || null;

  req.query.userId = userId;
  req.query.searchTerm = searchTerm;

  let productsPromise = productQueries.getProductsSatisfying(req.query);
  let categories = categoryQueries.getAllCategories();

  Promise.all([productsPromise, categories])
    .then(result => {
      const templateVars = {
        searchTerm,
        products: result[0],
        categories: result[1],
        user: userId,
        filters: req.query
      };
      res.render('product-listings', templateVars);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });
});

//POST products

router.post('/products', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.status(401).send('User not found')
    return;
  }
  console.log(req.body);
  productQueries.createProductListing({ ...req.body, seller_id: userId })
    .then(product => {
      res.redirect("products/myListings");
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
router.get("/products/:product_id", (req, res) => {
  const userId = req.session.user_id;

  productQueries.getProductById(req.params.product_id)
    .then(product => {
      const templateVars = { user: userId, product, timeago }
      res.render('review-products', templateVars);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });

});

module.exports = router;