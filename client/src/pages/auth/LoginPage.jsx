import React from 'react'
import LoginForm from '../../components/auth/LoginForm'

import AuthView from '../../views/AuthView'


const LoginPage = () => {
    

    return (
        <AuthView>
            <div className='flex items-center justify-center my-5'>
                <span className='text-4xl font-bold'>Login</span>
            </div>
            <LoginForm />
        </AuthView>
    )
}

export default LoginPage
