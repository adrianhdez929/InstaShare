import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/HomePage'
import FilesPage from './pages/FilesPage'

import { getIsLoggedIn } from './provider/app/selectors'


const AppRouter = () => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    
    return (
        <Routes>
            {
                isLoggedIn ? (
                    <Route exact path="/" element={ <FilesPage /> } />
                ) : (
                    <Route exact path="/" element={ <HomePage /> } />
                )
            }
            <Route exact path="/login" element={ <LoginPage /> } />
            <Route exact path="/register" element={ <RegisterPage /> } />
        </Routes>
    )
}

export default AppRouter
