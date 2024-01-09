import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import authService from './appwrite/auth'
import { useDispatch, useSelector} from 'react-redux'
import { login,logout } from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector((state)=>state.auth.userData)


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
  

  return loading ? "Loading":
  <div className='bg-gray-400 min-h-screen'>
    <div className='w-full block'>
      <Header userData = {userData}/>
        <main>
        <Outlet/>
        </main>
      <Footer/>
    </div>
  </div>
}

export default App
