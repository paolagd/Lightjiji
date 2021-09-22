const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/");
  }

  next();
};

module.exports = { requireLogin };