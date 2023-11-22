import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";

import { mongooseConnect } from '@/lib/mongoose';
import { compare } from 'bcryptjs';
import { User } from '@/models/User';




export default NextAuth({

 
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name:"Credentiels",
      async authorize(credentials,req) {
        console.log('Authorization function called with credentials:', credentials);
        await mongooseConnect();
        const user = await User.findOne({
          email: credentials.email,
        });
        console.log('User found:', user);
     
        if(!user){
            throw new Error("no user")
        }
        const checkPass=await compare(credentials.password,user.password)
        console.log('Password comparison result:', checkPass);
     
        if(!checkPass ||user.email!==credentials.email){
            throw new Error("Invalid email or passowrd")
        }
        return user;
      },
     }),
     
     
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,

  
});
