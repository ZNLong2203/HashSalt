import React from 'react'
import {useNavigate} from 'react-router-dom'
import ROUTES from '../routes/routes'

const Register = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-sky-500/50 flex flex-col md:flex-row items-center justify-center w-full h-screen">
            <div className="w-full flex items-center justify-center">
                <div className="bg-white px-10 py-20 rounded-3xl">
                    <h1 className="text-5xl font-semibold">Create an account</h1>
                    <p className="font-medium text-lg text-grey-500 mt-4">Create an account to get started</p>
                    <div className="mt-6">
                        <div>
                            <label className="text-lg font-medium">Email</label>
                            <input 
                                className="border border-gray-300 p-2 w-full mt-1 bg-transparent"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="text-lg font-medium">Password</label>
                            <input 
                                className="border border-gray-300 p-2 w-full mt-1 bg-transparent"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div>
                            <label className="text-lg font-medium">Confirm Password</label>
                            <input 
                                className="border border-gray-300 p-2 w-full mt-1 bg-transparent"
                                type="password"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <div>
                            <button className="bg-violet-500 text-white w-full py-2 mt-6 rounded-lg hover:bg-violet-600 transition duration-200">Register</button>
                        </div>
                        <div>
                            <p className="mt-6 text-center">Already have an account? <button className="bg-white text-violet-500 font-medium hover:text-violet-800 transition duration-200" onClick={() => navigate(ROUTES.LOGIN)}>Login</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-slate-700">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-lg animate-bounce"></div>
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
            </div>
        </div>
    )
}

export default Register