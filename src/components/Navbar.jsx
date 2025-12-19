import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import {
  Image,
  Flex,
  Text,
  Spacer,
  Avatar,
  Button,
  HStack,
  Heading,
  Switch,
  useColorMode,
  Box
} from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useContext(sessionContext)
  const { colorMode, toggleColorMode } = useColorMode()

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
      backdropFilter='blur(10px)'
      align='center'
      position='fixed'
      inset={0}
      zIndex={99}
      paddingBlock={10}
    >
      <HStack spacing='5px'>
        <Image src='favicon.png' alt='Bonsai logo' w={14} />
        <Heading as='h1' fontSize='3xl' color='white' display={{ base: 'none', sm: 'initial' }}>
          BudgetBonsai
        </Heading>
      </HStack>
      <Spacer />
      <HStack spacing={6}>
        <HStack spacing={2} align='center'>
          <Box
            as={FaSun}
            color={colorMode === 'light' ? 'yellow.400' : 'gray.400'}
            boxSize='18px'
            transition='color 0.2s'
          />
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme='green'
            size='md'
          />
          <Box
            as={FaMoon}
            color={colorMode === 'dark' ? 'blue.300' : 'gray.400'}
            boxSize='18px'
            transition='color 0.2s'
          />
        </HStack>
        {isLoggedIn && (
          <HStack spacing={4}>
            <Text whiteSpace='nowrap' fontWeight='bold' color='white' display={{ base: 'none', md: 'initial' }}>
              Hello, {userData?.name}!
            </Text>
            <Avatar size='md' src={userData?.picture} />
            <Button colorScheme='green' onClick={logoutHandler}>
              Logout
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  )
}
export default Navbar
