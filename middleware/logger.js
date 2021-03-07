// @desc logs request to console
const logger = (req, res, next) => {
  const txtLog = `${req.method} ${req.protocol}://${req.get('host')}${
    req.originalUrl
  }`;
  console.log(txtLog);
  next();
};

module.exports = logger;
