import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import ROUTES from '../routes/routes'

const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div className="relative">
        <img
          src="https://via.placeholder.com/40" // Replace with the user's profile image URL
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={handleDropdownToggle}
        />
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <li><a href={ROUTES.PROFILE} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Profile</a></li>
            <li><a href={ROUTES.ORDERS} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Orders</a></li>
            <li><a href={ROUTES.LOGOUT} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Logout</a></li>
          </ul>
        )}
        </div>
    )
}

export default UserMenu