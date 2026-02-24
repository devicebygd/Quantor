function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  req.flash('error', 'Zəhmət olmasa daxil olun.');
  res.redirect('/admin/login');
}

module.exports = { requireAdmin };
