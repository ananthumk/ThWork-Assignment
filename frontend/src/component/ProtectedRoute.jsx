import { useContext } from "react"
import AppContext from "../context/AppContext"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

export default function ProtectedRoute({element}){
    const {token} = useContext(AppContext)
    const navigate = useNavigate()
   if(!token){
     return <Navigate to='/login' replace />
   }
   return element
}