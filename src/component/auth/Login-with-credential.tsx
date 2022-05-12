import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import { staggerChildren, staggerChildrenWithDuration, verticalPosition } from '../../animations';
import { cookieKeys, cookiesTimeout, links } from '../../constants';
import { useAuthentication, useLoading } from '../../hooks';
import { clearUserFromLocalStorage, getCookie, setCookie } from '../../lib';
import { loginButtonSX, loginFormContainerSX } from '../../sx';
import { AppLink } from '../app';
import { MotionBox, MotionFlex } from '../framer';
  
  export default function LoginWithCredential() {
    const [loading, setLoading] = useLoading({isLoading: false, text: ""})
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

  //   const { user, userDetail, error, setloginError, loginError, userDetailError, loginWithCredentials } = useAuthentication()

  //   const router = useRouter()
  //   const toast = useToast()

  //   const handleSubmit = () => {
  //     setLoading({isLoading: true, text: "Redirecting..."})
  //     loginWithCredentials({username:email, password})
  //   }


  
  //   useEffect(() => {
  //     if(error || userDetailError || loginError) {
  //         userDetailError? toast({
  //             status: "error",
  //             title: userDetailError.message,
  //             variant: "left-accent",
  //             isClosable: true
  //         }) : "";
  //         error? toast({
  //             status: "error",
  //             title: error.message,
  //             variant: "left-accent",
  //             isClosable: true
  //         }) : "";
  //         loginError? toast({
  //           status: "error",
  //           title: loginError,
  //           variant: "left-accent",
  //           isClosable: true
  //       }) : "";
  //       setloginError('')
  //       setLoading({isLoading: false, text: ""})
  //         router.push("/paas-login")
          
  //     }
  //     // debugger
  //     if(user && userDetail){
  //         if (getCookie(cookieKeys.redirectUrl) !== "") {
  //             const redirectUrl = getCookie(cookieKeys.redirectUrl)
  //             setCookie(cookieKeys.redirectUrl, "", cookiesTimeout.timeoutCookie)
  //             router.push(redirectUrl)
  //         } else {
  //             router.push(links.dashboard)
  //         }
  //     }
      
  // }, [user, userDetail, error, userDetailError])

    return (        
      <form method="POST">
        
        {/* <MotionFlex sx={loginFormContainerSX}
            initial="hide"
            animate="show"
            variants={staggerChildrenWithDuration}
        >
            <MotionBox
                sx={{
                    overflow: "hidden",
                    display: "inline-block"
                }}

                animate="show"
                initial="hide"
                variants={staggerChildren}
            >
                <MotionBox
                    sx={{
                        display: "inline-block"
                    }}
                    justifyContent={'left'}
                    initial="hide"
                    animate="show"
                    variants={verticalPosition}
                >
                    <Text variant="card-header" size="page-header" >Login</Text>
                </MotionBox>
            </MotionBox>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={e => setEmail((e.target as HTMLInputElement).value)} value={email} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password"  onChange={e => setPassword((e.target as HTMLInputElement).value)} value={password} />
              </FormControl>
              <Stack spacing={5}>              
                <Button type="submit" variant="primary-button" onClick={handleSubmit} loadingText={loading.text} isLoading={loading.isLoading} sx={loginButtonSX}>
                            Login
                        </Button>

                {/* <AppLink href={links.login} color="brand.primary-blue" >Login with passport</AppLink> *
              
                        <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'center'}>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>  
              </Stack>
          
          </MotionFlex> */}
          </form>
    );
  }