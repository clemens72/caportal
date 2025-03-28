'use client';
import { signIn, signOut } from 'next-auth/react';
import Button from '@mui/material/Button';

export function SignIn() {
  return <Button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign In</Button>;
}

export function SignOut() {
  return <Button onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Sign Out</Button>;
}