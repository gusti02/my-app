{
  /* Set up next-auth*/
}
import { signIn, signInWithGoogle } from "@/utils/db/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Add more providers here to configure them with the providers option
    // this is using the credentials provider
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // fetch user from database if connect with database
        // and this signIn fucntion from services.ts
        const user: any = await signIn({ email });
        // check if user exist and password is correct
        // if correct then return user
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          null;
        }
      },
    }),
    // this is using google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      // Add user information and credentials to the token
      // If acoount provider is "credentials" and then token
      //will have email, fullname and role return token
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };

        await signInWithGoogle(
          data,
          (result: { status: boolean; message: string; data: any }) => {
            if (result.status) {
              token.email = result.data.email;
              token.fullname = result.data.fullname;
              token.type = result.data.type;
              token.image = result.data.image;
            }
          }
        );
      }
      return token;
    },
    async session({ session, token }: any) {
      // Add user information and credentials to the session
      // check if token have email, fullname and role return session
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  // customize pages SignIn
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
