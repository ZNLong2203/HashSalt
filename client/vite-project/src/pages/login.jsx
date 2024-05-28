import React from 'react'

const Login = () => {
    return (
        <div className="bg-white px-10 py-20 rounded-3xl">
            <h1 className="text-5xl font-semibold">Welcome Back</h1>
            <p className="font-medium text-lg text-grey-500 mt-4">Welcome back! Please enter your details</p>
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
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input
                            type="checkbox"
                            id="remember"
                        />
                        <label className="ml-2 font-medium text-base" htmlFor="remember"> Remember me</label>
                    </div>
                    <button className="font-medium text-base text-violet-500">Forgot password</button>
                </div>
                <div>
                    <button className="bg-violet-500 text-white w-full py-2 mt-6 rounded-lg hover:bg-violet-600 transition duration-200">Login</button>
                    <button className="bg-gray-200 text-black w-full py-2 mt-4 rounded-lg hover:bg-gray-300 transition duration-200">Login with Google</button>
                </div>
                <div>
                    <p className="mt-6 text-center">Don't have an account? <span className="text-violet-500 font-medium">Sign up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login