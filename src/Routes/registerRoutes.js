import express from 'express';
import bcrypt from './models/User.js';
// import User from './models/User.js'; // Replace with your actual DB model/helper

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic Validation: Ensure all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // 1. Check for duplicate email
    // Replace this line with your specific database query (e.g., SELECT * FROM users WHERE email = ?)
    const existingUser = await User.findOne({ email }); 
    
    if (existingUser) {
      // 409 Conflict: The resource already exists
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    // 2. Secure Password Hashing
    // 10 salt rounds is the standard industry balance between speed and security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save the new user to the database
    // Replace this with your specific DB insert logic
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword // Save the hashed password, NEVER the plain text!
    });

    // 4. Return success response (201 Created)
    return res.status(201).json({
      message: 'User registered successfully!',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;