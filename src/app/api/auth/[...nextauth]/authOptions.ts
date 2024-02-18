import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
};


export default authOptions;