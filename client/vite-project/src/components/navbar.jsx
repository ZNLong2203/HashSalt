import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import ROUTES from '../routes/routes'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white ">
            <div className="text-2xl font-bold">HashSalt</div>
            <div className="flex items-center space-x-4">
                <Link to={ROUTES.LOGIN} className="py-2 px-4 rounded-lg transition duration-200 hover:bg-white hover:text-purple-500">Login</Link>
                <Link to={ROUTES.REGISTER} className="py-2 px-4 rounded-lg bg-white text-purple-500 transition duration-200 hover:bg-purple-500 hover:text-white">Register</Link>
            </div>
        </nav>
    )
}

export default Navbar