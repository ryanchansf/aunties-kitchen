import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import authOptions from "./authOptions";

 const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
