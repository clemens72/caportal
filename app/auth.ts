import NextAuth from "next-auth"
import "next-auth/jwt"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    authorized({ auth: session }) {
      const isLoggedIn = !!session?.user;
      if (isLoggedIn) return true
      return false; // Redirect unauthenticated users to login page
    },
  },
})