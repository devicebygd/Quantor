const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDir = path.join(__dirname, '..', 'data');

function readJSON(filename) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, filename), 'utf8'));
  } catch (e) {
    return filename.endsWith('.json') && !filename.includes('settings') ? [] : {};
  }
}

// Home
router.get('/', (req, res) => {
  const services = readJSON('services.json').filter(s => s.active).sort((a, b) => a.order - b.order);
  const partners = readJSON('partners.json').filter(p => p.active).sort((a, b) => a.order - b.order);
  res.render('pages/index', {
    title: 'Ana Səhifə',
    services: services.slice(0, 6),
    partners
  });
});

// Services
router.get('/xidmetler', (req, res) => {
  const services = readJSON('services.json').filter(s => s.active).sort((a, b) => a.order - b.order);
  res.render('pages/services', {
    title: 'Xidmətlərimiz',
    services
  });
});

// Partners
router.get('/terefdaslar', (req, res) => {
  const partners = readJSON('partners.json').filter(p => p.active).sort((a, b) => a.order - b.order);
  res.render('pages/partners', {
    title: 'Tərəfdaşlarımız',
    partners
  });
});

// Contact
router.get('/elaqe', (req, res) => {
  res.render('pages/contact', {
    title: 'Əlaqə'
  });
});

// Contact form submission
router.post('/elaqe', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    req.flash('error', 'Zəhmət olmasa bütün vacib sahələri doldurun.');
    return res.redirect('/elaqe');
  }

  const messagesPath = path.join(dataDir, 'messages.json');
  const messages = readJSON('messages.json');

  messages.push({
    id: uuidv4(),
    name,
    email,
    phone: phone || '',
    subject: subject || '',
    message,
    read: false,
    date: new Date().toISOString()
  });

  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
  req.flash('success', 'Mesajınız uğurla göndərildi! Ən qısa zamanda sizinlə əlaqə saxlayacağıq.');
  res.redirect('/elaqe');
});

module.exports = router;
