import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import TimeProvider from './components/Providers/TimeProvider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TimeProvider>
          <SessionProvider session={session}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </SessionProvider>
        </TimeProvider>
      </body>
    </html>
  );
}