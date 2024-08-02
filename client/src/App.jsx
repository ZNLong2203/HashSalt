import './App.css'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ROUTES from './routes/routes'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ErrorPage from './pages/error';
import MyShop from './pages/myShop'
import CreateProduct from './pages/createProduct';
import MyDiscount from './pages/myDiscount'
import CreateDiscount from './pages/createDiscount'
import DetailsProduct from './pages/detailsProduct'
import MyDetailsProduct from './pages/myProduct'
import EditProducts from './pages/editProduct'
import CartPage from './pages/carts'
import PaymentSuccessPage from './pages/paymentSuccess';
import OrdersPage from './pages/orderHistory';
import ProfilePage from './pages/profile';

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