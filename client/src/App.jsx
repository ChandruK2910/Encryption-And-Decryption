import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import  {RegisterPage} from './components/RegisterPage'
import { Dashboard } from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
          <Route exact path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
