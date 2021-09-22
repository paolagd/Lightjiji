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
const { getAllUserConversations } = require("./lib/messages");
const { getUserById } = require('./lib/users');
const moment = require('moment');
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
app.get("/", (req, res) => {
  res.redirect("/api/products");
});

app.get("/messages", (req, res) => {
  const user = {
    id: 3,
    first_name: "Jayrese",
    last_name: "H",
    phone_number: "6472325522",
    email: "jay@gmail.com"
  };

  getAllUserConversations(user.id)
    .then(conversations => Promise.all(conversations.map(convo => {
      const { other_id, author_id } = convo;
      console.log('Other ID:', other_id, 'Author ID:', author_id, convo);
      return Promise
        .all([getUserById(other_id), getUserById(author_id)])
        .then(([other, author]) => ({
          ...convo,
          other,
          author,
          time_sent: moment(convo.time_sent).fromNow()
        }));
    }))).then(conversations => {
      console.log(conversations);
      res.render("conversation-list", { user, conversations });
    })
    .catch(errorMessage => {
      res.status(500).render({ error: errorMessage });
    })
});

app.get("/messages/:other_id", (req, res) => {
  const user = {
    first_name: "Jayrese",
    last_name: "H",
    phone_number: "6472325522",
    email: "jay@gmail.com"
  };

  res.render("conversation", { user });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
