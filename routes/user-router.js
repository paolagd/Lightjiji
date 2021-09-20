/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();

const { getUserById, createUser } = require('../lib/users');

// LOGIN
router.get('/login/:id', (req, res) => {
  // cookie-session
  req.session.user_id = req.params.id;

  // cookie-parser
  res.cookie('user_id', req.params.id);

  // redirect the client
  res.redirect('/');
});

// POST /api/users
router.post("/", (req, res) => {
  createUser(req.body)
    .then(user => {
      if (!user) {
        throw "Could not create user!";
      }

      res.json(user);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage })
    });
});

// GET /api/users/:user_id
router.get("/:user_id", (req, res) => {
  getUserById(req.params.user_id)
    .then(user => {
      if (!user) {
        throw "User not found!";
      }

      delete user.password;
      res.json(user);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });
});



module.exports = router;
