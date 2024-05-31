import { useState } from 'react'
import './App.css'
import 'tailwindcss/tailwind.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ROUTES from './routes/routes'
import Navbar from './components/navbar'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ProductDetails from './pages/detailsProduct'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:product_id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
