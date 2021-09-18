/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();

const { getUserById } = require('../lib/users');

// GET /api/users/:user_id
router.get("/:user_id", (req, res) => {
  getUserById(req.params.user_id)
    .then(user => {
      if (!user) {
        throw "User not found!";
      }
      res.json(user);
    })
    .catch(errorMessage => {
      res.status(500).json({ error: errorMessage });
    });
});

module.exports = router;
