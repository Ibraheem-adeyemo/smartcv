import { Flex } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/react'
import { m } from 'framer-motion'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { links } from '../constants'
import { AuthContext } from '../provider/auth-provider'

const Home: NextPage = () => {
  const { user, token } = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
      debugger
     if (token !== "") {
        router.push(links.dashboard)
      } else {
        router.push(links.login)
      }
  }, [token])

  return (
    <Flex height="100vh">
      {token == "" && <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" />}
    </Flex>
  )
}

export default Home
