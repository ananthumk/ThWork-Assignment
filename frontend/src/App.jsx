import { useEffect, useState } from 'react'
import './App.css'
import Task from './component/Task'
import AppContext from './context/AppContext'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import { Routes, Route } from 'react-router-dom'
import EditTask from './component/EditTask'

function App() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
  },[])

  const url = 'http://localhost:4000'
  return (
   <AppContext.Provider value={{
    token: token, url: url
   }}>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path='/edit/:id' element={<EditTask />} />
      </Routes>
   </AppContext.Provider>
  )
}

export default App
