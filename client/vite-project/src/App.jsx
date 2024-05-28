import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ROUTES from './routes/routes'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
