import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import  {RegisterPage} from './components/RegisterPage'
import { Dashboard } from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
