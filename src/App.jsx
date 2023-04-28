import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { sessionContext } from './contexts/sessionContext'
import { useContext } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import FinishLoginPage from './pages/FinishLoginPage'
import HomePage from './pages/HomePage'

import Navbar from './components/Navbar'

function App() {
  const { setIsLoggedIn } = useContext(sessionContext)

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken')
    
    if (sessionToken) setIsLoggedIn(true)
  }, [])

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/finishlogin' element={<FinishLoginPage />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  )
}

export default App
