'use server';
import { AuthError } from 'next-auth';
import type { AuthProvider } from './SignInPage';
import { signIn as signInAction } from '../../../auth';

async function signIn(provider: AuthProvider, formData: FormData, callbackUrl?: string) {
  try {
    return await signInAction(provider.id, {      
    ...(formData && { email: formData.get('email'), password: formData.get('password') }),      
      redirectTo: callbackUrl ?? '/',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    if (error instanceof AuthError) {
      return {
        error:
          error.message,
        type: error.type,
      };
    }
    return {
      error: 'Something went wrong.',
      type: 'UnknownError',
    };
  }
}

export default signIn;