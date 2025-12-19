import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { SessionContextProvider } from './contexts/sessionContext'

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SessionContextProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} storageKey="chakra-ui-color-mode" />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SessionContextProvider>
  </BrowserRouter>
)
