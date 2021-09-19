const express = require('express');
const router  = express.Router();

const { getAllUserConversations } = require('../lib/messages');

// GET /api/messages
router.get("/", (req, res) => {
  const userId = 1; // sessions not setup yet - change me
  getAllUserConversations(userId)
    .then(conversations => {
      res.json(conversations);
    })
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

module.exports = router;
