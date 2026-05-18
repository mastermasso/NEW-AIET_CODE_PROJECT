const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
//const { use } = require('react');



// In-memory tracking (for demo purposes)
let currentLoggedInUser = null;

// GET all users
router.get('/', (req, res) => {
  // Don't send passwords in production!
  const safeUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
  
  res.json({
    success: true,
    count: users.length,
    users: safeUsers
  });
});

// GET single user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// POST login route
router.post('/login', (req, res) => {
  const user = {"id":4,"name":"Master","email":"masso@gmail.com","password":"123"};

  const email = req.body.email;
  const password = req.body.password;
   console.log(email,password);
  if(user.email === email && user.password === password){
    console.log('user is logged in') 
  }
  else {console.log('user is not found')}
   

//   var my_user = users.forEach(user =>{
//   if(user.email === email && user.password === password){
//   console.log(`user is logged in ${user.email}`);
//     res.send(my_user);
// }})

console.log('issue')
   
});

// POST logout route
router.post('/logout', (req, res) => {
  if (!currentLoggedInUser) {
    return res.status(400).json({
      success: false,
      message: 'No user is currently logged in'
    });
  }
  
  const userName = currentLoggedInUser.name;
  currentLoggedInUser = null;
  
  res.json({
    success: true,
    message: `Goodbye ${userName}! You have been logged out successfully`
  });
});




module.exports = router;
