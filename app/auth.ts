import NextAuth from "next-auth"
import "next-auth/jwt"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded credential check
        if (credentials?.username === 'admin' && credentials?.password === 'password123') {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    authorized({ auth: session }) {
      const isLoggedIn = !!session?.user;
      if (isLoggedIn) return true
      return false;
    },
  },
})