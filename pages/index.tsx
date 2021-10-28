import { Flex } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/react'
import { m } from 'framer-motion'
import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { links } from '../constants'


const Home: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useMemo(() => {
    getSession().then(val => {
      if(val === null) {
        router.push(links.login)
      } else {
        router.push(links.dasboard)
      }
      // setLoading(false)
    })
  }, [])  

  return (
    <Flex height="100vh">
      {loading && <CircularProgress isIndeterminate color="brand.primary-blue" m="auto" size="120px" /> }
    </Flex>
  )
}

export default Home
