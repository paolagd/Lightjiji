INSERT INTO Users (first_name, last_name, phone_number, password, email)
     VALUES ('Jane','D', '2194567890', 'password', 'jane.doe@gmail.com')
  RETURNING *;
