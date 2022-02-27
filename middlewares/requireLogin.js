module.exports = (req, res, next) => {
  if (!req.user) {
    // terminate incoming request
    return res.status(401).send({ error: "You must log in!" });
  }
  //when everything is ok
  next();
};
