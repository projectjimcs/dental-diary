const isAdministrator = (req, res, next) => {
  const accountType = req.user.accountType;

  if (accountType !== 'superadmin') {
    return res.status('403').end();
  }

  next();
}

export {
  isAdministrator,
};