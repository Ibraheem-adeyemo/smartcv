import type { AppProps } from 'next/app'
import React from 'react'
import { AuthProvider, ThemeProvider } from '../src/providers'
import { SWRConfig } from 'swr'
import { fetchJson } from '../src/lib'
import Fonts from '../src/component/font'
import { NextPage } from 'next'
// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.

const App:NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher:fetchJson,
        onError:(err) => console.error({SWRError:err}),
        refreshInterval: 0
      }}
    >
      <AuthProvider>
        <ThemeProvider>
          <Fonts/>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
export default App