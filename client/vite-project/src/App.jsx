import { useState } from 'react'
import './App.css'
import 'tailwindcss/tailwind.css';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ROUTES from './routes/routes'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import MyShop from './pages/myShop'
import CreateProduct from './pages/createProduct';
import MyDiscount from './pages/myDiscount'
import CreateDiscount from './pages/createDiscount'
import ProductDetails from './pages/detailsProduct'
import EditProducts from './pages/editProduct'

function Main() {
  const location = useLocation()
  const hideFooterOnPages = [ROUTES.LOGIN, ROUTES.REGISTER]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myshop" element={<MyShop />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/mydiscount" element={<MyDiscount />} />
          <Route path="/creatediscount" element={<CreateDiscount />} />
          <Route path="/product/:product_id" element={<ProductDetails />} />
          <Route path="/edit/:product_id" element={<EditProducts />} />
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