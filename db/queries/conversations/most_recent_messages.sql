-- GET /api/convos/ - show all conversations (just the user ids they’re with and most recent messages)

-- Since either from_user_id or to_user_id will be the user you're logged in as
-- and the other is the person you're talking to the value of from_user_id = to_user_id
-- will be the same across the conversation. It'll also be unique across conversations
-- for the above reason.
--
-- The nested subquery is used because if DISTINCT ON and ORDER BY are used in conjunction
-- in then the outer query it must ORDER BY the expression in DISTINCT ON.
SELECT DISTINCT ON (from_user_id + to_user_id) M.*
              FROM (SELECT *
                      FROM Messages
                     WHERE from_user_id = 1 OR to_user_id = 1
                  ORDER BY time_sent DESC) AS M;
