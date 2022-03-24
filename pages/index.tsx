import { CircularProgress, useToast, Flex, BoxProps, FlexProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { appear } from '../src/animations'
import { MotionFlex } from '../src/component/framer/'
import { cookieKeys, cookiesTimeout, links } from '../src/constants'
import { getCookie, setCookie } from '../src/lib'
import { AuthContext } from '../src/providers'
const Home: NextPage = () => {
  const { user, token, error } = useContext(AuthContext)
  const router = useRouter()
  const toast = useToast()
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        router.push(window.location.pathname + window.location.search);
      }
    }
  }, [])

  useEffect(() => {
  
    if (typeof window !== "undefined") {
      if (getCookie(cookieKeys.token) === "") {
        // setCookie("redirectUrl", router.asPath, 10)
        router.push(links.login)
      }
      else if (typeof user !== "undefined" || typeof error !== "undefined") {
        if (typeof user !== "undefined") {
          if (getCookie(cookieKeys.redirectUrl) !== "") {
            const redirectUrl = getCookie(cookieKeys.redirectUrl)
            setCookie(cookieKeys.redirectUrl, "", cookiesTimeout.timeoutCookie)
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
    <MotionFlex sx={{
      height: "100vh"
    }}
    initial="hide"
    animate="show"
      variants={appear()}
    >
      {token == "" && <CircularProgress isIndeterminate color="brand.primary-blue" size="120px" sx={{
        margin: "auto"
      }}
      />}
    </MotionFlex>
  )
}

export default Home
