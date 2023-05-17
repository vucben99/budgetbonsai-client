import { useContext, useEffect } from 'react'
import { Flex, Card, CardBody, Heading, Image, Button, Text } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { sessionContext } from '../contexts/sessionContext'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'

function HomePage() {
  const clientBaseUrl = import.meta.env.VITE_CLIENT_BASE_URL
  const clientId = '570549999643-v2v38o9f648bi092dnbo4qigqp02sb4k.apps.googleusercontent.com'
  const scope = 'email%20profile%20openid'
  const redirectUri = `${clientBaseUrl}/finishlogin`
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=consent&access_type=offline`

  useEffect(() => {
    document.title = 'BudgetBonsai'
  }, [])

  const { isLoggedIn } = useContext(sessionContext)

  return !isLoggedIn ? (
    <>
      <Navbar />
      <Flex minH='70vh' justify='center' align='center' mt='80px' p={10}>
        <Flex
          direction='column'
          align='center'
          p={10}
          bg='#ffffff99'
          backdropFilter='blur(10px)'
          borderRadius='2xl'
        >
          <Image src='favicon.png' alt='Bonsai logo' w={32} />
          <Heading mt={5} fontSize={50}>
            BudgetBonsai
          </Heading>
          <Heading mt={5} fontSize={30}>
            Manage your expenses and incomes all in one place!
          </Heading>
          <Button
            as='a'
            href={googleLoginUrl}
            size='lg'
            colorScheme='whatsapp'
            leftIcon={<FcGoogle />}
            mt={5}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </>
  ) : (
    <>
      <Navbar />
      <Dashboard />
    </>
  )
}
export default HomePage
