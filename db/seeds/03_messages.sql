INSERT INTO Messages (from_user_id, to_user_id, content)
  VALUES (1, 2, 'Hello, I was wondering about the motorcycle you are selling, is it still available?'),
  (2, 1, 'Yes, it is.'),
  (1, 2, 'Can I go check it out?'),
  (2, 1, 'Sure, you can come tomorrow at 1PM'),
  (3, 4, 'Hi, I would like to but the Nike shoes.');

INSERT INTO Messages (from_user_id, to_user_id, content, time_sent)
  VALUES (1, 2, 'Message ON the 19th at 7pm 2021-09-19 19:58:01', '2021-09-19 19:58:01.360891'),
  (3, 1, 'Message 6','2021-09-10 19:58:01.360891'),
  (1, 2, 'Message on 18th 1pm','2021-09-18 13:58:01.360891'),
  (1, 4, 'Message on the 10 At 2pm', '2021-09-10 14:58:01.360891'),
  (4, 1, 'Message on the 11th at 9am','2021-09-11 09:58:01.360891'),
  (1, 4, 'Message on the 12th 2pm','2021-09-12 14:00:01.360891');
