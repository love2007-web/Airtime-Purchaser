import React from 'react'
import Signup from './Pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App