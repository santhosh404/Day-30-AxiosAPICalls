import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { UserContextProvider } from './contexts/UserContext.jsx'
import theme from '../theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ChakraProvider>
            <UserContextProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
            </UserContextProvider>
        </ChakraProvider>
    </BrowserRouter>
)
