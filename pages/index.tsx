import { Flex } from '@chakra-ui/layout'
import { CircularProgress, useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { cookieKeys, links } from '../constants'
import { getCookie, setCookie } from '../lib'
import { AuthContext } from '../provider/auth-provider'

const Home: NextPage = () => {
  const { user, token, error } = useContext(AuthContext)
  const router = useRouter()
  const toast = useToast()
  useEffect(() => {
    if(typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        router.push(window.location.pathname + window.location.search);
     }
    }
  }, [])
  useEffect(() => {
    // debugger
    if (typeof window !== "undefined") {
      if (getCookie("token") === "") {
        // setCookie("redirectUrl", router.asPath, 10)
        router.push(links.login)
      }
      else if (typeof user !== "undefined" || typeof error !== "undefined") {
        if (typeof user !== "undefined") {
          // debugger
          if(getCookie(cookieKeys.redirectUrl) !== "") {
            const redirectUrl = getCookie("redirectUrl")
            setCookie(cookieKeys.redirectUrl, "", -10)
            router.push(redirectUrl)
          } else {
            router.push(links.dashboard)
          }
        } else if (typeof error !== "undefined") {
          toast({
            title: typeof error.message !== "undefined" ? error.message : error,
            status: "error",
            variant: "left-accent",
            isClosable: true
          })
          // setCookie("redirectUrl", router.asPath, 10)
          router.push(links.login)
        }
      }
    }
  }, [user, error])

  return (
    <Flex height="100vh">
      {token == "" && <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" />}
    </Flex>
  )
}

export default Home
