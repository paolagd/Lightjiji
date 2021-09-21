// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
var cookieSession = require('cookie-session');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes   = require("./routes/user-router");
const productRoutes = require("./routes/product-router");
const messageRoutes = require("./routes/message-router");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/messages", (req, res) => {
  const userInfo = {
    1: {
      first_name: "Paola",
      last_name: "G",
      phone_number: "6472322222",
      email: "paola@gmail.com"
    },
    3: {
      first_name: "Jayrese",
      last_name: "H",
      phone_number: "6472325522",
      email: "jay@gmail.com"
    }
  };
  const messages = [
    {
      "message_id": 18,
      "author_id": 1,
      "content": "Test with sessions!",
      "time_sent": "2021-09-20T16:17:17.948Z"
    },
    {
      "message_id": 12,
      "author_id": 3,
      "content": "Message 6",
      "time_sent": "2021-09-10T19:58:01.360Z"
    },
    {
      "message_id": 16,
      "author_id": 1,
      "content": "Message on the 12th 2pm",
      "time_sent": "2021-09-12T14:00:01.360Z"
    }
  ];
  const user = userInfo[3];

  res.render("conversations", { userInfo, messages, user });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
