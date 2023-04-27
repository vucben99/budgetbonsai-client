import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { SessionContextProvider } from './contexts/sessionContext'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SessionContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SessionContextProvider>
  </BrowserRouter>
)
