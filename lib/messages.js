const db = require('./db-connect');

const getAllUserConversations = userId => {
  const queryString = `SELECT DISTINCT ON (from_user_id + to_user_id) M.*
  FROM (SELECT *
          FROM Messages
         WHERE from_user_id = $1 OR to_user_id = $1
      ORDER BY time_sent DESC) AS M;
`;

return query.db(queryString, [userId])
.then(result => result.rows[0]);

};

const getMessagesWithUser = (myUserId, theirUserId) => {
  const queryString = `SELECT *
  FROM Messages
  WHERE from_user_id = 1 OR to_user_id = 1;`;
  return db.query(queryString, [myUserId, theirUserId])
  .then(result => result.rows);

  
};

const sendMessage = (fromUserId, toUserId, messageContent) => {
  const queryString = `INSERT INTO Messages (from_user_id, to_user_id, content)
  VALUES ($1, $2, $3);
`;

return db.query(queryString, [fromUserId, toUserId, messageContent])
.then(result => result.rows[0]);
};

module.exports = {
  getAllUserConversations,
  getMessagesWithUser,
  sendMessage
};