import React from 'react'
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Heading,
  HStack,
  Link,
  IconButton,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa'
// import logo1 from '../../assets'

const Links = ['Admin', 'Contact', 'My Orders'];

const NavLink = ({ children, linkTo }: { children: ReactNode, linkTo:string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={linkTo}>
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('#04224a', 'gray.900')} color={'white'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'lg'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex alignItems={'center'} width={'50%'} justifyContent={'space-between'}>
            <Link href={'/'}>Logo</Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link} linkTo={link}>{link}</NavLink>
              ))}
            </HStack>
          </Flex>
          <Flex alignItems={'center'} width={'400px'} justifyContent={'space-between'}>
            <Flex display={{ base: 'none', md: 'flex' }} >
                <Box>Hi User</Box>
                {/* <Link href='/orders'>My Orders</Link> */}
                <Button bg={'none'}>Logout</Button>
            </Flex>            
            <Button
                bg={'none'}
              mr={4}>
                <Heading as='h5' size='md'>Cart</Heading>
                <Icon as={FaShoppingCart} w={6} h={6} color='red.500' />
            </Button>
            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} linkTo={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar;