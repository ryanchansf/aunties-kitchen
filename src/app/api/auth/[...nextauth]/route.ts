import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // callbacks: {
    //     async signIn({ user, account }: { user: any; account: any }) {
    //         console.log("User", user);
    //         console.log("Account", account);
    //         const { name, email } = user;
    //         if (account.provider === "google") {
    //             try {
    //                 const res = await fetch(
    //                     "http://localhost:3000/api/student",
    //                     {
    //                         method: "POST",
    //                         headers: {
    //                             "Content-Type": "application/json",
    //                         },
    //                         body: JSON.stringify({
    //                             name,
    //                             email,
    //                         }),
    //                     }
    //                 );

    //                 return user;
    //             } catch (e: any) {
    //                 console.log(e);
    //             }
    //         }
    //         return false;
    //     },
    // },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
