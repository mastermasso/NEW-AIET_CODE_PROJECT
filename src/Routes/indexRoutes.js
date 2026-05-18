const express = require('express');
const router = express.Router();

// Home route
router.get('/home', (req, res) => {
  res.render('Home', { title: 'Home' });
  // or res.sendFile for static HTML
});

// About route
router.get('/about', (req, res) => {
  res.render('About', { title: 'About Us' });
});

// Contact route
router.get('/contact', (req, res) => {
  res.render('Contact', { title: 'Contact' });
});

// Services route
router.get('/services', (req, res) => {
  res.render('Services', { title: 'Our Services' });
});

module.exports = router;

