import {nextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { signOut } from "next-auth/react";

export const authOptions = {
    providers: [
        CredentialsProvider({
            
            name:"credentials",
            
            credentials:{},
            
            async authorize(credentials) {
                try {
                    await connect();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error('Email not registered!');
                    }

                    if (!user.isVerified) {
                        throw new Error('First verify your account!');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (user && isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Invalid Password');
                    }
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user,trigger,session }) {
          if (user) {
            return {
                ...token,
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                mobileNo: user.mobileNo
            };
          }

          if (trigger === "update") {
            token.firstName = session.firstName,
            token.email = session.email,
            token.mobileNo = session.mobileNo
          }

          return token;
        },
        async session({ session, token }) {
          if (token) {
            session.user = {
                id: token.id,
                firstName: token.firstName,
                email: token.email,
                mobileNo: token.mobileNo
            };
          }
          return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}
