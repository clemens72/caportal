'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignIn } from '@/app/components/auth-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session, router]);

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
      <Typography variant="h4" component="h1" gutterBottom>
        You must be signed in to access this content.
      </Typography>
      <SignIn />
    </Box>
  );
}