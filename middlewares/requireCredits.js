module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    // terminate incoming request
    return res.status(403).send({ error: "Not enough credits!" });
  }
  //when everything is ok
  next();
};
