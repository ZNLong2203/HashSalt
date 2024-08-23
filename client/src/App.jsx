import './App.css'
import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ROUTES from './routes/routes'
import Navbar from './components/navbar'
import Footer from './components/footer'

// Lazy loading the components
const Home = React.lazy(() => import('./pages/home'))
const Login = React.lazy(() => import('./pages/auth/login'))
const Register = React.lazy(() => import('./pages/auth/register'))
const ErrorPage = React.lazy(() => import('./pages/status/error'))
const MyShop = React.lazy(() => import('./pages/products/myShop'))
const CreateProduct = React.lazy(() => import('./pages/products/createProduct'))
const MyDiscount = React.lazy(() => import('./pages/discounts/myDiscount'))
const CreateDiscount = React.lazy(() => import('./pages/discounts/createDiscount'))
const DetailsProduct = React.lazy(() => import('./pages/products/detailsProduct'))
const MyDetailsProduct = React.lazy(() => import('./pages/products/myProduct'))
const EditProducts = React.lazy(() => import('./pages/products/editProduct'))
const CartPage = React.lazy(() => import('./pages/orders/carts'))
const PaymentSuccessPage = React.lazy(() => import('./pages/orders/paymentSuccess'))
const OrdersPage = React.lazy(() => import('./pages/orders/orderHistory'))
const ProfilePage = React.lazy(() => import('./pages/profile/profile'))
const AboutPage = React.lazy(() => import('./pages/common/about'))
const ContactPage = React.lazy(() => import('./pages/common/contact'))
const Dashboard = React.lazy(() => import('./pages/admin/dashboard'))

function Main() {
  const location = useLocation()
  const hideFooterOnPages = [ROUTES.LOGIN, ROUTES.REGISTER]

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const expired = localStorage.getItem('expired')
    if (!token) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token-storage')
      localStorage.removeItem('expired')
    } else if (expired && Date.now() > expired) {
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
        <Suspense fallback={<div className='items-center justify-center text-6xl'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
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
