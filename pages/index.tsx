import { Flex } from '@chakra-ui/layout'
import { CircularProgress, useToast } from '@chakra-ui/react'
import { m } from 'framer-motion'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { links } from '../constants'
import { getCookie } from '../lib'
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
    debugger
    if (typeof window !== "undefined") {
      if (getCookie("token") === "") {
        router.push(links.login)
      }
      else if (typeof user !== "undefined" || typeof error !== "undefined") {
        if (typeof user !== "undefined") {
          router.push(links.dashboard)
        } else if (typeof error !== "undefined") {
          toast({
            title: typeof error.message !== "undefined" ? error.message : error,
            status: "error",
            variant: "left-accent",
            isClosable: true
          })
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
