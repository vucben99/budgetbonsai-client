import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { sessionContext } from './contexts/sessionContext'
import { useContext } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import FinishLoginPage from './pages/FinishLoginPage'
import HomePage from './pages/HomePage'

function App() {
  const { setIsLoggedIn, userData, setUserData } = useContext(sessionContext)

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken')
    const userData = localStorage.getItem('userData')

    if (sessionToken) {
      setIsLoggedIn(true)
      setUserData(JSON.parse(userData))
    }
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/finishlogin' element={<FinishLoginPage />} />
        <Route path='*' element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
