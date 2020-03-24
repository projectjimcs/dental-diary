const isAdministrator = (req, res, next) => {
  const accountType = req.user.accountType;

  if (accountType !== 'admin') {
    res.status('403').end();
  }

  next();
}

export {
  isAdministrator,
};