import React from 'react'
import { routes } from './routes'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@chakra-ui/react'

export default function App() {
  return (
      <Routes>
        {
          routes.map((route, idx) => <Route key={idx} path={route.path} element={<route.element />} />)
        }

        {/* Navigating the user to home page, if there is any other routes */}
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
  )
}
