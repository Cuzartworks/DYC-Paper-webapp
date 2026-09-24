import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const devAdminEmail = process.env.ADMIN_EMAIL ?? "admin@dycpaper.art";
const devAdminPassword = process.env.ADMIN_PASSWORD ?? "dycpaper-admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === devAdminEmail &&
          credentials?.password === devAdminPassword
        ) {
          return { id: "admin", email: devAdminEmail, name: "DYC PAPER Admin" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-me",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
