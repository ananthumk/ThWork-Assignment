import { useEffect, useState } from 'react'
import './App.css'
import Task from './component/Task'
import AppContext from './context/AppContext'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import { Routes, Route } from 'react-router-dom'
import EditTask from './component/EditTask'
import ProtectedRoute from './component/ProtectedRoute'
import NotFound from './pages/NotFound'

function App() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
  },[])

  const updateToken = (newToken) => {
    setToken(newToken)
    if(newToken){
      localStorage.getItem('token', newToken)
    } else {
      localStorage.remove('token')
    }
  }

  const url = 'https://thwork-assignment.onrender.com'
  // const url = 'http://localhost:4000'
  return (
   <AppContext.Provider value={{
    token: token, url: url, updateToken: updateToken
   }}>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<ProtectedRoute element={<Home />} />} />
        <Route path="/task" element={<ProtectedRoute element={<Task />} />} />
        <Route path='/edit/:id' element={<ProtectedRoute element={<EditTask />} />} />
        <Route path='/not-found' element={<NotFound />} />
      </Routes>
   </AppContext.Provider>
  )
}

export default App
