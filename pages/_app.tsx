import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr';

import { AuthProvider } from '../context/auth'
import { UserProvider } from '../context/user';
import { swrConfig } from '../api';

import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig value={ swrConfig }>
      <SessionProvider session={session}>
        <UserProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </UserProvider>
      </SessionProvider>
    </SWRConfig>
  )
}
