import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn as getUserByEmail } from "../../../utlis/db/servicefirebase";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                //fullname: { label: "Full Name", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) return null;

                const user: any = await getUserByEmail(credentials.email);

                if (!user) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password,
                );

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    fullname: user.fullname,
                    role: user.role,
                };
            }

        })
    ],

    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token.email) {
                session.user.email = token.email
            }
            if (token.fullname) {
                session.user.fullname = token.fullname
            }
            if (token.role) {
                session.user.role = token.role
            }
            return session;
        },  
    },


    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);