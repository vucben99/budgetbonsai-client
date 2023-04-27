import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { sessionContext } from '../contexts/sessionContext'

function FinishLoginPage() {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(sessionContext)

  useEffect(() => {
    async function finishLogin() {
      try {
        const code = new URLSearchParams(window.location.search).get('code')
        const sessionTokenResponse = await axios.post('http://localhost:8000/api/login', { code })
        const sessionToken = sessionTokenResponse.data.sessionToken
        localStorage.setItem('sessionToken', sessionToken)
        // const userData = jwt_decode(sessionToken)
        setIsLoggedIn(true)
        navigate('/')
      } catch (error) {
        console.error(error.message)
      }
    }
    finishLogin()
  }, [])

  return <h2>Redirecting...</h2>
}

export default FinishLoginPage
