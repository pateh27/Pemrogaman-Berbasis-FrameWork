import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn as getUserByEmail, signInWithProvider } from "../../../utlis/db/servicefirebase";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user: any = await getUserByEmail(credentials.email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }: any) {

      // ✅ Saat login pertama (credentials / social)
      if (user) {
        token.email = user.email;
        token.fullname = user.fullname || user.name;
        token.role = user.role;
      }

      // ✅ Semua provider (Google & GitHub disatukan)
      if (account?.provider && user) {
        const data = {
          fullname: user.name,
          email: user.email || `${user.name}@${account.provider}.local`, // fallback kalau null
          image: user.image,
          type: account.provider,
        };

        const result = await signInWithProvider(data, account.provider);

        if (result.status === "success" && result.data) {
          token.fullname = result.data.fullname;
          token.email = result.data.email;
          token.image = result.data.image;
          token.type = result.data.type;
          token.role = result.data.role;
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token.email) session.user.email = token.email;
      if (token.fullname) session.user.fullname = token.fullname;
      if (token.image) session.user.image = token.image;
      if (token.role) session.user.role = token.role;
      if (token.type) session.user.type = token.type;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);