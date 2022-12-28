import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import '../styles/globals.css'
import { AuthProvider } from '../context/auth'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  )
}
