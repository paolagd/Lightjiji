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
const { getUserById } = require('./lib/users');
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

// automatically add a user object to the request
app.use((req, res, next) => {
  const userId = req.session ? req.session.user_id : null;

  getUserById(userId)
    .then(user => {
      req.user = user;
    }).catch(() => {
      req.user = null;
    }).finally(() => {
      next();
    });
});

const usersRoutes   = require("./routes/user-router");
const productRoutes = require("./routes/product-router");
const messageRoutes = require("./routes/message-router");
const pageRoutes = require("./routes/page-router");

app.use("/", pageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
