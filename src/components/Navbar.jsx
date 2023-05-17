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
      {isLoggedIn && (
        <HStack spacing={3}>
          <Text whiteSpace='nowrap' fontWeight='bold' display={{ base: 'none', md: 'initial' }}>
            {userData?.name}
          </Text>
          <Avatar size='md' src={userData?.picture} />
          <Button colorScheme='green' onClick={logoutHandler}>
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  )
}
export default Navbar
