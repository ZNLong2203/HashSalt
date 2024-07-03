import axios from 'axios'
import toast from 'react-hot-toast'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import ROUTES from '../routes/routes'
import useStoreToken from '../hooks/useStoreToken'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setAuthenticated, setRole} = useStoreToken()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(email === '' || password === '') {
            toast.error('Please fill in all fields')
        }
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
            })
            if(res.status === 200) {
                toast.success('Login successful')
                localStorage.setItem('accessToken', res.data.accessToken)
                setRole(res.data.role)
                setAuthenticated(true)
                navigate(ROUTES.HOME)
            }
        } catch(err) {
            toast.error('Login failed')
        }
    }
    return (
        <div className="bg-sky-500/50 flex flex-col md:flex-row items-center justify-center w-full h-screen">
            <div className="w-full flex items-center justify-center">
                <div className="bg-white px-10 py-20 rounded-3xl">
                    <h1 className="text-5xl font-semibold">Welcome Back</h1>
                    <p className="font-medium text-lg text-grey-500 mt-4">Welcome back! Please enter your details</p>
                    <div className="mt-6">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="text-lg font-medium">Email</label>
                                <input 
                                    className="border border-gray-300 p-2 w-full mt-1 bg-transparent"
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-medium">Password</label>
                                <input 
                                    className="border border-gray-300 p-2 w-full mt-1 bg-transparent"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
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
                                <button className="bg-white font-medium text-base text-violet-500">Forgot password</button>
                            </div>
                            <div>
                                <button className="bg-violet-500 text-white w-full py-2 mt-6 rounded-lg hover:bg-violet-600 transition duration-200">Login</button>
                            </div>
                        </form>
                        <div>
                            <button className="bg-gray-200 text-black w-full py-2 mt-4 rounded-lg hover:bg-gray-300 transition duration-200"
                                onClick={() => window.location.href = "http://localhost:3000/auth/google"}
                                >Login with Google
                            </button>
                        </div>
                        <div>
                            <p className="mt-6 text-center">Don't have an account? <button className="bg-white text-violet-500 font-medium hover:text-violet-800 transition duration-200" onClick={() => navigate(ROUTES.REGISTER)}>Sign up</button></p>
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

export default Login