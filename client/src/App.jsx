import './App.css'
import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ROUTES from './routes/routes'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ErrorPage from './pages/status/error';
import MyShop from './pages/products/myShop';
import CreateProduct from './pages/products/createProduct';
import MyDiscount from './pages/discounts/myDiscount'
import CreateDiscount from './pages/discounts/createDiscount'
import DetailsProduct from './pages/products/detailsProduct'
import MyDetailsProduct from './pages/products/myProduct'
import EditProducts from './pages/products/editProduct'
import CartPage from './pages/orders/carts'
import PaymentSuccessPage from './pages/orders/paymentSuccess';
import OrdersPage from './pages/orders/orderHistory';
import ProfilePage from './pages/profile/profile';

function Main() {
  const location = useLocation()
  const hideFooterOnPages = [ROUTES.LOGIN, ROUTES.REGISTER]

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if(!token) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token-storage')
      localStorage.removeItem('expired')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/myshop" element={<MyShop />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/mydiscount" element={<MyDiscount />} />
          <Route path="/creatediscount" element={<CreateDiscount />} />
          <Route path="/product/:product_id" element={<DetailsProduct />} />
          <Route path="/myproduct/:product_id" element={<MyDetailsProduct />} />
          <Route path="/edit/:product_id" element={<EditProducts />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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