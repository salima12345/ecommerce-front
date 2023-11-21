import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
 if (req.method === 'POST') {
 const { name, email, password } = req.body;

 try {
 // Check if the user with the same email already exists
 const existingUser = await User.findOne({ email });
 if (existingUser) {
  return res.status(400).json({ message: 'Email already in use' });
 }

 // Hash the password with 5 salt rounds
 const hashedPassword = await bcrypt.hash(password, 5);

 // Create a new user
 const user = new User({ name, email, password: hashedPassword });

 // Save the user in the background
 setTimeout(async () => {
  try {
    await user.save();

    // Issue a JWT token
    const token = jwt.sign({ userId: user._id }, 'Salima@2001', { expiresIn: '1h' });

    // Set the token as an HTTP-only cookie
    res.setHeader('Set-Cookie', `JwtToken=${token}; HttpOnly; Secure; SameSite=Strict; path=/;`);

    // Send the response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
 }, 0);

 // Return a response immediately
 res.status(202).json({ message: 'User registration in progress' });
 } catch (error) {
 console.error(error);
 res.status(500).json({ message: 'Error registering user', error: error.message });
 }
 }
}
