
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import User from "./models/user";
import connect  from "./db/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
   callbacks: {
    async signIn({user}){
      connect();
      const existingUser = await User.findOne({ email: user?.email });
      if (existingUser) {
        console.log("User already exists", existingUser);
        return true;
      }
      const newUser = await User.create({
        name: user?.name,
        email: user?.email
      });
      console.log("User created", newUser);
      return true;
    }
  }
});