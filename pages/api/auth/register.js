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

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 12);

     // Create a new user
     const user = new User({ name, email, password: hashedPassword });
     await user.save();

     // Issue a JWT token
     const token = jwt.sign({ userId: user._id }, 'Salima@2001', { expiresIn: '1h' });

     // Set the token as an HTTP-only cookie
     res.setHeader('Set-Cookie', `JwtToken=${token}; HttpOnly; Secure; SameSite=Strict; path=/;`);

     // Send the response
     res.status(201).json({ message: 'User registered successfully' });
   }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
   }
   
 }
}
