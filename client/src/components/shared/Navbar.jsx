import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getIsLoggedIn } from '../../provider/app/selectors'
import { logout, checkIsLoggedIn } from '../../provider/app/actions'


const AuthMenu = () => {
    return (
        <div className='flex px-5'>
            <Link to='/login' className='rounded-md bg-indigo-500 text-white px-3 py-2 font-bold hover:bg-indigo-600 mx-2'>
                Login
            </Link>
            <Link to='/register' className='rounded-md bg-indigo-500 text-white px-3 py-2 font-bold hover:bg-indigo-600 mx-2'>
                Register
            </Link>
        </div>
    )
}

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    const dispatch = useDispatch()

    const onLogout = () => {
        console.log('click')
        dispatch(logout)
    }

    return (
        <div 
            onFocus={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen((open) => !open)}}
            onBlur={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false)}}
            className='flex flex-col items-center px-5'
        >
            <button 
                onClick={ () => setIsOpen(open => !open) }
                className='py-2'
            >
                <img className='rounded-full w-8 mx-1' src='https://avatars.githubusercontent.com/u/43711136?s=40&v=4' alt='avatar' /> 
            </button>
            {
                isOpen && (
                    <div className='flex flex-col items-center justify-center w-24 rounded-md shadow-md border bg-white'>
                        <button 
                            onClick={onLogout}
                            className='hover:bg-gray-100 p-2 w-full'
                        >
                            Log Out
                        </button>
                    </div>
                )
            }
        </div>
    )
}

const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn)
            dispatch(checkIsLoggedIn)
    }, [])

    return (
        <div className='w-full shadow-md py-5 px-10'>
            <div className='flex justify-between'>
                <div className='font-bold text-3xl'>
                    Task Admin
                </div>
                {
                    isLoggedIn ? (
                        <UserMenu />
                    ) : (
                        <AuthMenu />
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
