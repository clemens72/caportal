import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import TopBar from './components/TopBar';
import TimeProvider from './components/Providers/TimeProvider';
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { AppProvider, Navigation } from './components/Providers/AppProvider';
import HomeIcon from "@mui/icons-material/Home";
import { auth } from '../auth';

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main Menu",
  },
  {
    segment: "",
    title: "Home",
    icon: <HomeIcon />,
  },
];

const BRANDING = {
  title: 'Class Acts Entertainment',
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TimeProvider>
          <SessionProvider session={session}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <TopBar />
                <CssBaseline />
                <AppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                session={session}
                authentication={AUTHENTICATION}
                theme={theme}
              >
                {props.children}
                </AppProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </SessionProvider>
        </TimeProvider>
      </body>
    </html>
  );
}