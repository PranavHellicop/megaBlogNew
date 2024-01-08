import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser() //will return an object containing userid, and other credentials that we've asked for during signup?
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  }, [])
  

  return loading ? null:
  <div className='bg-gray-400 min-h-screen'>
    <div className='w-full block'>
      <Header/>
        <main>
        <Outlet/>
        </main>
      <Footer/>
    </div>
  </div>
}

export default App
