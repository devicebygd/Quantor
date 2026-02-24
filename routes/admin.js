const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { requireAdmin } = require('../middleware/auth');

const dataDir = path.join(__dirname, '..', 'data');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|svg|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Yalnız şəkil faylları yüklənə bilər.'));
  }
});

function readJSON(filename) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf8'));
  } catch (e) {
    return filename.includes('settings') ? {} : [];
  }
}

function writeJSON(filename, data) {
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2));
}

// ---- LOGIN ----
router.get('/login', (req, res) => {
  if (req.session.isAdmin) return res.redirect('/admin');
  res.render('admin/login', { title: 'Admin Giriş', layout: false });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const settings = readJSON('settings.json');

  if (username === settings.adminUsername) {
    // First login: if password is 'admin123' and hash doesn't match, create hash
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, settings.adminPassword);
    } catch (e) {
      isValid = false;
    }

    // Default password fallback for first setup
    if (!isValid && password === 'admin123') {
      const hash = await bcrypt.hash('admin123', 10);
      settings.adminPassword = hash;
      writeJSON('settings.json', settings);
      isValid = true;
    }

    if (isValid) {
      req.session.isAdmin = true;
      req.flash('success', 'Uğurla daxil oldunuz!');
      return res.redirect('/admin');
    }
  }

  req.flash('error', 'Yanlış istifadəçi adı və ya şifrə.');
  res.redirect('/admin/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// ---- DASHBOARD ----
router.get('/', requireAdmin, (req, res) => {
  const services = readJSON('services.json');
  const partners = readJSON('partners.json');
  const messages = readJSON('messages.json');
  const unreadCount = messages.filter(m => !m.read).length;

  res.render('admin/dashboard', {
    title: 'Admin Panel',
    serviceCount: services.length,
    partnerCount: partners.length,
    messageCount: messages.length,
    unreadCount
  });
});

// ---- SERVICES CRUD ----
router.get('/services', requireAdmin, (req, res) => {
  const services = readJSON('services.json').sort((a, b) => a.order - b.order);
  res.render('admin/services', { title: 'Xidmətlər', services });
});

router.post('/services/add', requireAdmin, (req, res) => {
  const services = readJSON('services.json');
  const { title, shortDesc, fullDesc, icon, order } = req.body;

  services.push({
    id: uuidv4(),
    title,
    shortDesc,
    fullDesc,
    icon: icon || 'default',
    order: parseInt(order) || services.length + 1,
    active: true
  });

  writeJSON('services.json', services);
  req.flash('success', 'Xidmət uğurla əlavə edildi.');
  res.redirect('/admin/services');
});

router.post('/services/edit/:id', requireAdmin, (req, res) => {
  const services = readJSON('services.json');
  const idx = services.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    req.flash('error', 'Xidmət tapılmadı.');
    return res.redirect('/admin/services');
  }

  const { title, shortDesc, fullDesc, icon, order, active } = req.body;
  services[idx] = {
    ...services[idx],
    title,
    shortDesc,
    fullDesc,
    icon: icon || services[idx].icon,
    order: parseInt(order) || services[idx].order,
    active: active === 'on' || active === 'true'
  };

  writeJSON('services.json', services);
  req.flash('success', 'Xidmət uğurla yeniləndi.');
  res.redirect('/admin/services');
});

router.post('/services/delete/:id', requireAdmin, (req, res) => {
  let services = readJSON('services.json');
  services = services.filter(s => s.id !== req.params.id);
  writeJSON('services.json', services);
  req.flash('success', 'Xidmət silindi.');
  res.redirect('/admin/services');
});

// ---- PARTNERS CRUD ----
router.get('/partners', requireAdmin, (req, res) => {
  const partners = readJSON('partners.json').sort((a, b) => a.order - b.order);
  res.render('admin/partners', { title: 'Tərəfdaşlar', partners });
});

router.post('/partners/add', requireAdmin, upload.single('logo'), (req, res) => {
  const partners = readJSON('partners.json');
  const { name, description, website, order } = req.body;

  partners.push({
    id: uuidv4(),
    name,
    description,
    logo: req.file ? '/uploads/' + req.file.filename : '',
    website: website || '',
    order: parseInt(order) || partners.length + 1,
    active: true
  });

  writeJSON('partners.json', partners);
  req.flash('success', 'Tərəfdaş uğurla əlavə edildi.');
  res.redirect('/admin/partners');
});

router.post('/partners/edit/:id', requireAdmin, upload.single('logo'), (req, res) => {
  const partners = readJSON('partners.json');
  const idx = partners.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    req.flash('error', 'Tərəfdaş tapılmadı.');
    return res.redirect('/admin/partners');
  }

  const { name, description, website, order, active } = req.body;
  partners[idx] = {
    ...partners[idx],
    name,
    description,
    website: website || '',
    order: parseInt(order) || partners[idx].order,
    active: active === 'on' || active === 'true'
  };

  if (req.file) {
    partners[idx].logo = '/uploads/' + req.file.filename;
  }

  writeJSON('partners.json', partners);
  req.flash('success', 'Tərəfdaş uğurla yeniləndi.');
  res.redirect('/admin/partners');
});

router.post('/partners/delete/:id', requireAdmin, (req, res) => {
  let partners = readJSON('partners.json');
  partners = partners.filter(p => p.id !== req.params.id);
  writeJSON('partners.json', partners);
  req.flash('success', 'Tərəfdaş silindi.');
  res.redirect('/admin/partners');
});

// ---- MESSAGES ----
router.get('/messages', requireAdmin, (req, res) => {
  const messages = readJSON('messages.json').sort((a, b) => new Date(b.date) - new Date(a.date));
  res.render('admin/messages', { title: 'Mesajlar', messages });
});

router.post('/messages/read/:id', requireAdmin, (req, res) => {
  const messages = readJSON('messages.json');
  const idx = messages.findIndex(m => m.id === req.params.id);
  if (idx !== -1) {
    messages[idx].read = true;
    writeJSON('messages.json', messages);
  }
  res.redirect('/admin/messages');
});

router.post('/messages/delete/:id', requireAdmin, (req, res) => {
  let messages = readJSON('messages.json');
  messages = messages.filter(m => m.id !== req.params.id);
  writeJSON('messages.json', messages);
  req.flash('success', 'Mesaj silindi.');
  res.redirect('/admin/messages');
});

// ---- SETTINGS ----
router.get('/settings', requireAdmin, (req, res) => {
  const settings = readJSON('settings.json');
  res.render('admin/settings', { title: 'Tənzimləmələr', siteSettings: settings });
});

router.post('/settings', requireAdmin, (req, res) => {
  const settings = readJSON('settings.json');
  const {
    siteName, siteTagline, siteDescription,
    phone, email, address,
    facebook, linkedin, instagram,
    heroTitle, heroSubtitle, aboutText,
    stat1Number, stat1Label, stat2Number, stat2Label,
    stat3Number, stat3Label, stat4Number, stat4Label
  } = req.body;

  Object.assign(settings, {
    siteName, siteTagline, siteDescription,
    phone, email, address,
    facebook, linkedin, instagram,
    heroTitle, heroSubtitle, aboutText,
    heroStats: [
      { number: stat1Number, label: stat1Label },
      { number: stat2Number, label: stat2Label },
      { number: stat3Number, label: stat3Label },
      { number: stat4Number, label: stat4Label }
    ]
  });

  writeJSON('settings.json', settings);
  req.flash('success', 'Tənzimləmələr uğurla yeniləndi.');
  res.redirect('/admin/settings');
});

router.post('/settings/password', requireAdmin, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const settings = readJSON('settings.json');

  const isValid = await bcrypt.compare(currentPassword, settings.adminPassword);
  if (!isValid) {
    req.flash('error', 'Cari şifrə yanlışdır.');
    return res.redirect('/admin/settings');
  }

  if (newPassword !== confirmPassword) {
    req.flash('error', 'Yeni şifrələr uyğun gəlmir.');
    return res.redirect('/admin/settings');
  }

  if (newPassword.length < 6) {
    req.flash('error', 'Şifrə ən azı 6 simvol olmalıdır.');
    return res.redirect('/admin/settings');
  }

  settings.adminPassword = await bcrypt.hash(newPassword, 10);
  writeJSON('settings.json', settings);
  req.flash('success', 'Şifrə uğurla dəyişdirildi.');
  res.redirect('/admin/settings');
});

module.exports = router;
