import { useContext, useState, useEffect } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import {
  Image,
  Flex,
  Box,
  Icon,
  Text,
  Spacer,
  Avatar,
  Button,
  HStack,
  Heading
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { GiBonsaiTree } from 'react-icons/gi'
import jwt_decode from 'jwt-decode'

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useContext(sessionContext)

  function logoutHandler() {
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('userData')
    setIsLoggedIn(false)
    setUserData(null)
  }

  const clientBaseUrl = import.meta.env.VITE_CLIENT_BASE_URL
  const clientId = '570549999643-v2v38o9f648bi092dnbo4qigqp02sb4k.apps.googleusercontent.com'
  const scope = 'email%20profile%20openid'
  const redirectUri = `${clientBaseUrl}/finishlogin`
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=consent&access_type=offline`

  return (
    <Flex
      as='nav'
      h='65px'
      p='16px'
      bg='whatsapp.400'
      align='center'
      position='fixed'
      inset={0}
      zIndex={99}
    >
      <HStack spacing='5px'>
        <Image src='favicon.png' alt='Bonsai logo' w={14} />
        <Heading as='h1' fontSize='3xl' color='white' display={{ base: 'none', sm: 'initial' }}>
          BudgetBonsai
        </Heading>
      </HStack>
      <Spacer />
      {isLoggedIn ? (
        <HStack spacing={3}>
          <Text whiteSpace='nowrap' fontWeight='bold' display={{ base: 'none', md: 'initial' }}>
            {userData?.name}
          </Text>
          <Avatar size='md' src={userData.picture} />
          <Button colorScheme='green' onClick={logoutHandler}>
            Logout
          </Button>
        </HStack>
      ) : (
        <Button
          as='a'
          href={googleLoginUrl}
          size='lg'
          colorScheme='whatsapp'
          leftIcon={<FcGoogle />}
        >
          Login
        </Button>
      )}
    </Flex>
  )
}
export default Navbar
