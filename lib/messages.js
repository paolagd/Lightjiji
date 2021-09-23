const db = require('./db-connect');

const getAllUserConversations = userId => {
  const queryString = `
  SELECT DISTINCT ON (from_user_id + to_user_id) M.*
                FROM (SELECT *
                        FROM Messages
                       WHERE from_user_id = $1 OR to_user_id = $1
                    ORDER BY time_sent DESC) AS M;`;
  return db
    .query(queryString, [userId])
    .then(result => result.rows.map(convo => ({
      message_id: convo.id,
      author_id: convo.from_user_id,
      other_id: convo.from_user_id === Number(userId) ? convo.to_user_id : convo.from_user_id,
      content: convo.content,
      time_sent: convo.time_sent
    })));
};

const getMessagesWithUser = (myUserId, theirUserId) => {
  const queryString = `SELECT *
  FROM Messages
  WHERE (from_user_id = $1 AND to_user_id = $2)
     OR (from_user_id = $2 AND to_user_id = $1)`;

  return db
    .query(queryString, [myUserId, theirUserId])
    .then(result => result.rows.map(convo => ({
      message_id: convo.id,
      author_id: convo.from_user_id,
      content: convo.content,
      time_sent: convo.time_sent
    })))
    .catch(e => 'Internal SQL error!');
};

const sendMessage = (fromUserId, toUserId, messageContent) => {
  const queryString = `INSERT INTO Messages (from_user_id, to_user_id, content)
                            VALUES ($1, $2, $3) RETURNING *`;

  return db
    .query(queryString, [fromUserId, toUserId, messageContent])
    .then(result => result.rows[0] || null)
    .then(result => {
      if (!result) {
        return null;
      }

      return {
        message_id: result.id,
        author_id: fromUserId,
        content: result.content,
        time_sent: result.time_sent
      };
    })
    .catch(() => 'Internal SQL error!');
};

module.exports = {
  getAllUserConversations,
  getMessagesWithUser,
  sendMessage
};
