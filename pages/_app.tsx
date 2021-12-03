import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../provider'
import theme from "../theme"
import { SWRConfig } from 'swr'
import { fetchJson } from '../lib'
import Fonts from '../component/font'
import { NextPage } from 'next'
// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.

const App:NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher:fetchJson,
        onError:(err) => console.error({SWRError:err})
      }}
    >
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Fonts/>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
export default App