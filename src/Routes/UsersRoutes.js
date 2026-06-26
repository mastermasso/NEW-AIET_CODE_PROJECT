const express = require('express');
const router = express.Router();
const users = require('../data/users.json')
const fs = require("fs");
const user =require('../Models/user')

router.post('/register', async(req,res)=>{
    try{
       const person = { username, email, password} = req.body;
       
    //check if all required fields are available
    if (!username || !email || !password) {
        return res.status(400).json({ message : 'All fields are required'})
    }
    //check if user already exists
    const existingUser = await users.findOne({email});
    if(existingUser) {
       return res.status(400).json({ message: 'Email is already registered'});
    }

    fs.readFile('./data/user.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
  fs.writeFile('./Data/user.json',person)
});

    
    // ///create a new user
    // const newUser = new User({
    //     username,
    //     email,
    //     password,//handled securely by the schema pre-save hook
    // });
    // //4. save the user to mongoDb
    // await newUser.save();

      //respond with success status
    res.status(201).json({
        message: 'User registered succesfully',
        user: {
            id: newUser.id,
            username: newUser, username,
            email: newUser.email
        }
    });

    }catch(error) {
        //pickup validation errors or faults
        res.status(500).json({ message: 'Serve error, error: error message'});    
    }
   });

//This creates a session
router.post('/login',(req, res) =>{

  //define the request params from the body
  const email = req.body.email;
  const password = req.body.password;

//test if the users body is complete
  if(!email && !password){
    return res.sendStatus(400)
    .json({"message":"You request body is bad/empty"})

  }

  //find our user using the email as it is distinct /unique
  const user = users.find(person => person.email === email);
  
  //if the user is not found return that messsage
  if (!user){
    return res.json({"message":"user not found"})
  }
//log user in console for dev purposes
  console.log(user);

  //this is the user mock-database validation
  if (email === user.email && password === user.password){
   
    //store user data into session
    req.session.id = 'user_12345'
    req.session.username = user.username;

    return res.status(200).json({message: `session created successfully.${username}`});

  }

  return res.status(401).json({ error:'Invalid credentials'});
});


// In-memory tracking (for demo purposes)



// GET all users
// router.post('/login', (req, res) => {

//   const { email, password }=req.body;
//   // Testing if fields are missing
//   if( !email && !password ){
//     res.status(400).json({ 
//      error: "Bad request",
//      message: "The request body is  missing one or more required fields: email, password" 
    
//     });
//   }
//   console.log(email,password)
//   const founduser = users.find(user => user.email === email && user.password === password );

//   if(!founduser) {
//     return res.status(404).json ({
//       message: 'No user found in the local json file matching this email.'
//     });
//   }
//   if(founduser.role === "admin"){
//     res.json(users); 
//  }else if (founduser === "dev"){
//   console.log("You do not have permission to view")
//  } 

//     //  Proceed with logic if test passes
//   //   return res.status(200).json({
//   //     message: "return status matches successfully!",
//   //     receivedData: { email, password}
//   //  });
//    }); 
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
router.post('/logout', (req, res) =>{
// log the session id 
 console.log(req.sessionID);

 ///destroy the session 
 req.session.destroy();

//return a successful log out
  res.json({
    success: true,
    message: `Goodbye! You have been successfully logged out`
  });
});




module.exports = router;
