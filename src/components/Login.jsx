import React from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Input, Button, Logo} from "./index"
import { Link } from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const navigate = useNavigate()

    const login = async (data) => {
        console.log("loginData provided by user: ",data)
        setError("")
        try {
            const session = await authService.login(data) 
            {console.log("login session",session)}  //got the session token, meaning user has logged in, so extract the userData and update the state
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log("Data about the user, called from appwrite: ",userData)

                if (userData) dispatch(authLogin({userData}))
                navigate("/")   //advantage of useNavigate over Link is that user don't have to press a button or take action, you can force it
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className="mb-2 flex justify-center">
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don't have an account? 

            <Link 
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                    SignUp here
            </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)}>
            <div className='space-y-5'>
                <Input
                    label="Email: "
                    type="email"
                    className=""
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true,
                        validate: {
                            pattern: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || "Email address must be valid"
                        }
                    })}
                />
                <Input
                    label="Password: "
                    type="password"
                    className=""
                    {...register("password", {
                        required: true
                    })}
                />
                <Button
                    type='submit'
                    className='w-full'
                >Sign in</Button>
            </div>
            </form>
            </div>
        </div>
    )
}

export default Login