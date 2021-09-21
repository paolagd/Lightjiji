const express = require('express');
const router  = express.Router();

const {
  getMessagesWithUser,
  sendMessage
} = require('../lib/messages');

// GET /api/messages/:other_id
router.get("/:other_id", (req, res) => {
  const myUserId = req.session.user_id;
  const otherId = req.params.other_id;

  getMessagesWithUser(myUserId, otherId)
    .then(messages => {
      res.json(messages)
    })
    .catch(errorMessage => res.status(500).json({ error: errorMessage }));
});

// POST /api/messages/:other_id
router.post("/:other_id", (req, res) => {
  const fromUserId = req.session.user_id;
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
