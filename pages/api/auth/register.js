import { User } from '@/models/User';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Queue from 'bull';
import { mongooseConnect } from '@/lib/mongoose';
const userQueue = new Queue('user');

export default async function handler(req, res) {
  await mongooseConnect();
 if (req.method === 'POST') {
 const { name, email, password } = req.body;

 try {
 const existingUser = await User.findOne({ email });
 if (existingUser) {
 return res.status(400).json({ message: 'Email already in use' });
 }

 const hashedPassword = await hash(password, 5);

 const user = new User({ name, email, password: hashedPassword });

 userQueue.add(user);

 res.status(202).json({ message: 'User registration in progress' });
 } catch (error) {
 console.error(error);
 res.status(500).json({ message: 'Error registering user', error: error.message });
 }
 }
}

userQueue.process(async (job, done) => {
 try {
 await job.save();

 const token = jwt.sign({ userId: user._id }, 'Salima@2001', { expiresIn: '1h' });

 res.setHeader('Set-Cookie', `JwtToken=${token}; HttpOnly; Secure; SameSite=Strict; path=/;`);

 res.status(201).json({ message: 'User registered successfully' });

 done();
 } catch (error) {
 console.error(error);
 done(error);
 }
});
