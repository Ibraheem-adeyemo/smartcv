import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { links } from '../constants'


const Home: NextPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  

  return (
    <></>
  )
}

// checks for exixsting coookie session to redirect to the correct page
export async function getServerSideProps({req, res}:{req:NextApiRequest, res:NextApiResponse}) {
  
  const session = await getSession({ req })

  if(!session){
    res.setHeader("location",links.login)
  } else if(session) {
    res.setHeader("location",links.dasboard)
  }    res.statusCode = 302;
  res.end();
  
  return { props: {} }

}

export default Home
