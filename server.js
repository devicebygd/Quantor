const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'quantor-cms-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(flash());

// Global template variables
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error')
  };
  res.locals.currentPath = req.path;
  res.locals.isAdmin = req.session && req.session.isAdmin;

  // Load settings for all pages
  const settingsPath = path.join(__dirname, 'data', 'settings.json');
  try {
    res.locals.settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } catch (e) {
    res.locals.settings = {};
  }

  next();
});

// Routes
const frontendRoutes = require('./routes/frontend');
const adminRoutes = require('./routes/admin');

app.use('/', frontendRoutes);
app.use('/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Səhifə tapılmadı' });
});

app.listen(PORT, () => {
  console.log(`Quantor website running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
