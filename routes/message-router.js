const express = require('express');
const router  = express.Router();

const {
  getAllUserConversations,
  getMessagesWithUser,
  sendMessage
} = require('../lib/messages');

// GET /api/messages
router.get("/", (req, res) => {
  const myUserId = 1; // sessions not setup yet - change me
  getAllUserConversations(myUserId)
    .then(conversations => {
      res.json(conversations);
    })
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

// GET /api/messages/:other_id
router.get("/:other_id", (req, res) => {
  const myUserId = 1;
  const otherId = req.params.other_id;

  getMessagesWithUser(myUserId, otherId)
    .then(messages => {
      res.json(messages)
    })
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

// POST /api/messages/:other_id
router.post("/:other_id", (req, res) => {
  const fromUserId = 1;
  const toUserId = req.params.other_id;
  const messageContent = req.body.message;

  sendMessage(fromUserId, toUserId, messageContent)
    .then(message => {
      if (!message) {
        throw "Message not sent!";
      }

      res.json(message);
    })
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

module.exports = router;
