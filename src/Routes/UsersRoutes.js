const express = require('express');
const router = express.Router();
const users = require('../data/users.json');




// In-memory tracking (for demo purposes)
let currentLoggedInUser = null;

router.get('/login',(req,res) =>{
res.render("login");
})
// GET all users
router.post('/login', (req, res) => {

  const { email, password }=req.body;
  // Testing if fields are missing
  if( !email && !password ){
    res.status(400).json({ 
     error: "Bad request",
     message: "The request body is  missing one or more required fields: email, password" 
    
    });
  }
  console.log(email,password)
  const founduser = users.find(user => user.email === email && user.password === password );

  if(!founduser) {
    return res.status(404).json ({
      message: 'No user found in the local json file matching this email.'
    });
  }
  if(founduser.role === "admin"){
    res.json(users); 
 }else if (founduser === "dev"){
  console.log("You do not have permission to view")
 } 

    //  Proceed with logic if test passes
  //   return res.status(200).json({
  //     message: "return status matches successfully!",
  //     receivedData: { email, password}
  //  });
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
    message: `Goodbye ${userName}! You have been successfully logged out`
  });
});




module.exports = router;
