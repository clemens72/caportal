'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  useEffect(() => {
    if (session?.user) {
      router.push(callbackUrl);
    }
  }, [session, router, callbackUrl]);

  const handleCredentialSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const result = await signIn('credentials', {
          username,
          password,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.url) {
          router.push(result.url);
        }
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (error) {
      setError('Authentication failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Class Acts Portal
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        You are required to sign in to access this content.
      </Typography>

      <Box component="form" onSubmit={handleCredentialSignIn} noValidate sx={{ mt: 1, mb: 3, width: '100%', maxWidth: 300 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In with Credentials
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>

      <Typography component="div" sx={{ mt: 2, mb: 1 }}>
        Or sign in with:
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        onClick={() => signIn('google', { callbackUrl })}
        sx={{ maxWidth: 300 }}
        startIcon={<GoogleIcon />}
      >
        Google
      </Button>
    </Box>
  );
}