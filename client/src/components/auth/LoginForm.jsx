import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'react-feather'
import { useDispatch } from 'react-redux'

import { login } from '../../provider/app/actions'


const LoginInput = ({ value, onChange, placeholder, name, type='', required=false }) => {    
    return (
        <input 
            className='my-2 p-2 outline-none rounded-md bg-gray-100 hover:bg-gray-200 focus:border-b-2'
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange }
            name={ name }
            type={ type ? type : 'text' }
            required={ required }
        />
    )
}

const LoginForm = () => {
    const [formData, setFormData] = useState({
        'username': '',
        'password': ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFormInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onFormSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/users/token/', formData)
        .then(res => {
            localStorage.setItem('token', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            dispatch(login)
            navigate('/', { replace: true })
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='flex justify-center w-full'>
            <form 
                className='rounded-md shadow-md p-5 w-1/4'
                onSubmit={onFormSubmit}
            >
                <div className='text-center p-2'>
                    <label>Username</label>
                    <LoginInput
                        name='username'
                        placeholder='Username'
                        value={ formData['username'] }
                        onChange={ onFormInputChange }
                        required
                    />
                </div>
                <div className='text-center p-2'>
                    <label>Password</label>
                    <LoginInput 
                        name='password'
                        placeholder='Password'
                        value={ formData['password'] }
                        onChange={ onFormInputChange }
                        type='password'
                        required
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <button
                        type='submit'
                        className='flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-800 text-white w-1/2 my-3 p-2'
                    >
                        <Icons.Key className='mr-1' size={18} /> Log In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
