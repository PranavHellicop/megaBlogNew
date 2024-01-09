import React from 'react'
import { Container,LogoutBtn,Logo} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = ({userData}) => {
  const authStatus = useSelector((state)=>state.auth.status)
  // const userData = useSelector((state)=>state.auth.userData)
  const navigate = useNavigate()
  // {console.log("userData from the store:",userData)}
  const navItems = [
  {
    name:'Home',
    slug:'/',
    active:true
  },
  {
    name:'Signup',
    slug:"/signup",
    active:!authStatus
  },
  {
    name:'Login',
    slug:"/login",
    active: !authStatus
  },
  {
    name:'All Posts',
    slug:"/all-posts",
    active:authStatus
  },
  {
    name:'Add Post',
    slug:"/add-post",
    active:authStatus
  }
]

   return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 flex'>
            <Link to='/'>
              <Logo width='70px'></Logo>
            </Link>
            <div className='mx-5'>{authStatus && userData ? `Hi ${userData.name}`:""}</div>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>(
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={()=>navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ):null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header