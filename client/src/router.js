import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/HomePage'
import TasksPage from './pages/TasksPage'

import { getIsLoggedIn } from './provider/app/selectors'


const AppRouter = () => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    
    return (
        <Routes>
            {
                isLoggedIn ? (
                    <Route exact path="/" element={ <TasksPage /> } />
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
