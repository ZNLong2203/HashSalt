import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ROUTES from './routes/routes'
import './App.css'
import Navbar from './components/navbar'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
