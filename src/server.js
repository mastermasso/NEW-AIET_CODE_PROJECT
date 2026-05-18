const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));

//Static folder for images/css/js
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Simple logging middleware (beginners can see how middleware works)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Routes
const indexRoutes = require('./Routes/indexRoutes');
const usersRoutes = require('./Routes/UsersRoutes');
const productsRoutes = require('./Routes/productsRoutes');
app.use('/', indexRoutes);           // Home, About, Contact, Services
app.use('/users', usersRoutes);      // Users, Login, Logout
app.use('/products', productsRoutes); // All products, specific product

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: {
      'Index Routes': ['/', '/about', '/contact', '/services'],
      'Users Routes': ['/users', '/users/:id', '/users/login (POST)', '/users/logout (POST)', '/users/me'],
      'Products Routes': ['/products', '/products/:id', '/products/category/:category']
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log('\nAvailable routes:');
  console.log('📄 Index Routes:');
  console.log('   - GET  /home');
  console.log('   - GET  /about');
  console.log('   - GET  /contact');
  console.log('   - GET  /services');
  console.log('\n👥 Users Routes:');
  console.log('   - GET  /users');
  console.log('   - GET  /users/:id');
  console.log('   - POST /users/login');
  console.log('   - POST /users/logout');
  console.log('   - GET  /users/me');
  console.log('\n📦 Products Routes:');
  console.log('   - GET  /products');
  console.log('   - GET  /products/:id');
  console.log('   - GET  /products/category/:category');
});
module.exports = app;