import { User } from '@/models/User';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Queue from 'bull';
import { mongooseConnect } from '@/lib/mongoose';
// Create a new Bull queue
const userQueue = new Queue('user');

export default async function handler(req, res) {
  await mongooseConnect();
 if (req.method === 'POST') {
 const { name, email, password } = req.body;

 try {
 // Check if the user with the same email already exists
 const existingUser = await User.findOne({ email });
 if (existingUser) {
 return res.status(400).json({ message: 'Email already in use' });
 }

 // Hash the password with 5 salt rounds
 const hashedPassword = await hash(password, 5);

 // Create a new user
 const user = new User({ name, email, password: hashedPassword });

 // Add the user to the queue
 userQueue.add(user);

 // Return a response immediately
 res.status(202).json({ message: 'User registration in progress' });
 } catch (error) {
 console.error(error);
 res.status(500).json({ message: 'Error registering user', error: error.message });
 }
 }
}

// Process the user queue
userQueue.process(async (job, done) => {
 try {
 // Save the user
 await job.save();

 // Issue a JWT token
 const token = jwt.sign({ userId: user._id }, 'Salima@2001', { expiresIn: '1h' });

 // Set the token as an HTTP-only cookie
 res.setHeader('Set-Cookie', `JwtToken=${token}; HttpOnly; Secure; SameSite=Strict; path=/;`);

 // Send the response
 res.status(201).json({ message: 'User registered successfully' });

 done();
 } catch (error) {
 console.error(error);
 done(error);
 }
});
