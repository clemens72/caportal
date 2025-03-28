'use client';

import { useEffect, useState } from 'react';
import { SignIn, SignOut } from './auth-components';
import { useSession } from 'next-auth/react';

export default function UserButton() {
  const { data: session } = useSession();

  if (!session?.user) return <SignIn />;
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}<br />
      </span>
      <SignOut />
    </div>
  );
}