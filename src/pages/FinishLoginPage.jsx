import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { sessionContext } from '../contexts/sessionContext'
import { Flex, Spinner } from '@chakra-ui/react'

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

function FinishLoginPage() {
  const navigate = useNavigate()
  const { setIsLoggedIn, setUserData } = useContext(sessionContext)

  useEffect(() => {
    async function finishLogin() {
      try {
        const code = new URLSearchParams(window.location.search).get('code')
        const sessionTokenResponse = await axios.post(`${backendBaseUrl}/api/login`, { code })
        const sessionToken = sessionTokenResponse.data.sessionToken
        localStorage.setItem('sessionToken', sessionToken)
        const decodedToken = jwt_decode(sessionToken)
        const user = {
          name: `${decodedToken.first_name} ${decodedToken.last_name}`,
          email: decodedToken.email,
          picture: decodedToken.picture
        }
        localStorage.setItem('userData', JSON.stringify(user))
        setUserData(user)
        setIsLoggedIn(true)
        navigate('/')
      } catch (error) {
        console.error(error.message)
      }
    }
    finishLogin()
  }, [])

  return (
    <Flex minHeight='100vh' justify='center' alignItems='center'>
      <Spinner size='xl' color='white' />
    </Flex>
  )
}

export default FinishLoginPage
