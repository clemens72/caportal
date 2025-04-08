// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Connection, Request, TYPES } from 'tedious';
import bcrypt from 'bcryptjs';

// Database connection configuration (move these to environment variables in production)
const config = {
    server: (process.env.SQL_SERVER_HOST) as string,
    authentication: {
      type: 'default' as 'default',
      options: {
        userName: process.env.SQL_SERVER_USER,
        password: process.env.SQL_SERVER_PASSWORD,
      },
    },
    options: {
      database: process.env.SQL_SERVER_DATABASE,
      trustServerCertificate: true,
    },
  };

  export const { handlers: { GET, POST }, auth } = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        // The name for the credentials form in the sign in page
        name: 'Credentials',
        async authorize(credentials, req) {
          const { username, password } = credentials;
  
          if (!username || !password) {
            return null;
          }
  
          try {
            const connection = new Connection(config);
  
            await new Promise((resolve, reject) => {
              connection.on('connect', (err) => {
                if (err) {
                  console.error('Database connection error:', err);
                  reject(err);
                } else {
                  resolve(null);
                }
              });
              connection.connect();
            });
  
            const user = await new Promise((resolve, reject) => {
              const query = `SELECT id, username, password, first_name, last_name FROM users WHERE username = @username`;
              const request = new Request(query, (err, rowCount, rows) => {
                if (err) {
                  console.error('Database query error:', err);
                  reject(err);
                  connection.close();
                } else if (rowCount === 1) {
                  const userRow = rows[0];
                  const id = userRow[0].value;
                  const username = userRow[1].value;
                  const storedPasswordHash = userRow[2].value;
                  const firstName = userRow[3].value;
                  const lastName = userRow[4].value;

                  // Compare the provided password with the stored hash using bcrypt
                  bcrypt.compare(String(password), String(storedPasswordHash), (bcryptErr, result) => {
                    if (bcryptErr) {
                      console.error('Bcrypt compare error:', bcryptErr);
                      resolve(null);
                      connection.close();
                    }
                    if (result) {
                      resolve({ id, username, firstName, lastName });
                      connection.close();
                    } else {
                      resolve(null);
                      connection.close();
                    }
                  });
                } else {
                  resolve(null);
                  connection.close();
                }
              });
              request.addParameter('username', TYPES.VarChar, username);
              connection.execSql(request);
            });
  
            if (user) {
              return user as any; // Type casting to any to satisfy NextAuth type
            } else {
              return null;
            }
          } catch (error) {
            console.error('Authentication error:', error);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt', // You can choose 'jwt' or 'database'
    },
    secret: process.env.NEXTAUTH_SECRET, // Required for JWT strategy, generate a strong secret
    pages: {
      signIn: '/auth/signin', // Your custom sign-in page
    },
    callbacks: {
      async session({ session, token, user }) {
        // Send properties to the client
        if (token?.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user?.id) {
          token.sub = user.id as string;
        }
        return token;
      },
    },
  });