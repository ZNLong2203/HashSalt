import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-sky-500/50 flex flex-col md:flex-row items-center justify-center w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <Login />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-slate-700">
          <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-lg animate-bounce"></div>
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  )
}

export default App
