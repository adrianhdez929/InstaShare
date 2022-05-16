import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'

import AuthView from '../../views/AuthView'


const RegisterPage = () => {
    

    return (
        <AuthView>
            <div className='flex items-center justify-center my-5'>
                <span className='text-4xl font-bold'>Register</span>
            </div>
            <RegisterForm />
        </AuthView>
    )
}

export default RegisterPage
