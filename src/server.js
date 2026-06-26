const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const mysql = require('mysql2');
import MySQLStoreFactory from re;
const MongoStore = require('express-mysql-session');

//View engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Views'));

//Static folder for images/css/js
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON bodies (for POST requests)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const MongoStore = require('connect-mongo'); // Now this will be 'read'
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: function (req) {
      var match = req.url.match(/^\/([^/]+)/);
      return {
        path: match ? '/' + match[1] : '/',
        httpOnly: true,
        secure: req.secure || false,
        maxAge: 60000 * 10
      }
    },
  })
);
//routes
const indexRoutes = require('./Routes/indexRoutes');
const usersRoutes = require('./Routes/UsersRoutes');
const productsRoutes = require('./Routes/productsRoutes');
const ordersRoutes = require('./Routes/ordersRoutes');
const InvoiceRoutes = require ('./Routes/InvoiceRoutes');

app.use('/', indexRoutes);           // Home, About, Contact, Services
app.use('/users', usersRoutes);      // Users, Login, Logout
app.use('/products', productsRoutes); // All products, specific product
app.use('/invoice', InvoiceRoutes);  // Invoice routes
app.use('/orders', ordersRoutes);    // Orders routes

// Simple logging middleware (beginners can see how middleware works)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]${req.method} ${req.url}`);
  next();
});
// Routes

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
const connect = async()=>{
mysql.createConnection(({
  host: 'localhost',
  user: 'root',
  password: 'Master14260744157',
  database: 'auth_db'
})) };

connection.connect();                     // open the TCP connection
// This line establishes the initial network handshake with your database server.
// It opens the communication channel so Node.js can start sending commands.

connection.query('SELECT 1 + 1 AS solution', (err, rows) => {
// This sends a SQL query to the database to evaluate "1 + 1" and alias the result as "solution".
// It also sets up a callback function that waits for the database to respond with either an error or rows of data.

  if (err) throw err;
  // If the database encounters a problem (e.g., syntax error, lost connection), 
  // this line halts execution and throws the error so you can see what went wrong.

  console.log('The solution is:', rows[0].solution);
  // This extracts the first row of the returned data array (rows[0]) and prints 
  // the value of the 'solution' column (which will be 2) to your console.
console.log('Connected to MySQL database successfully!');

console.error('❌ Database connection failed!');
    console.error(`Error Details: ${error.message}`);
    
    if (error.code) {
      console.error(`Error Code: ${error.code}`);
    }
  });
// });
// This closing bracket marks the end of the query's asynchronous callback function.

connection.end();                         // close the connection
// This gracefully terminates the database connection after all pending queries 
// in the queue have finished executing, preventing memory leaks or hanging processes.

//Connect t mongodb databse
// mongoose.connect("mongodb+srv://Master01:Master01@master02.rgjl8xx.mongodb.net/")
// .then(() => console.log('Connected to mongoDb'))
// .catch(err => console.error('Database connection error:, err'));
 
app.listen(PORT,()=> console.log('server running on port 3000'));

module.exports = app;
