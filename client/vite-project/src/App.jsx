import { useState } from 'react'
import './App.css'
import 'tailwindcss/tailwind.css';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import ROUTES from './routes/routes'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ProductDetails from './pages/detailsProduct'

function Main() {
  const location = useLocation()
  const hideFooterOnPages = [ROUTES.LOGIN, ROUTES.REGISTER]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:product_id" element={<ProductDetails />} />
        </Routes>
      </main>
      {hideFooterOnPages.includes(location.pathname) ? null : <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

export default App