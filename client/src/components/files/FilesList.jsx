import axios from 'axios'
import React, { useState } from 'react'
import * as Icon from 'react-feather'
import { useDispatch } from 'react-redux'

import { fetchFileList } from '../../provider/app/actions'


const FileItemMenu = ({ content, onEdit, isEditing }) => {
    const dispatch = useDispatch()

    const onFileDelete = () => {
        axios.delete(`http://localhost:8000/files/${content.pk}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            dispatch(fetchFileList)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='flex items-center px-5'>
            <button 
                onClick={ onFileDelete }
                className='rounded-full hover:bg-gray-100 border bg-white shadow-md p-2 mx-1'>
                <Icon.Trash color='red'/>
            </button>
            <a href={ `http://localhost:8000${content.url}` } download className='rounded-full hover:bg-gray-100 border bg-white shadow-md p-2 mx-1'>
                <Icon.Download color='blue' />
            </a>
            <button 
                onClick={ onEdit }
                className={`rounded-full hover:bg-gray-100 border ${isEditing ? 'bg-gray-200' : 'bg-white'} shadow-md p-2 mx-1`}
            >
                <Icon.Edit color='green' />
            </button>
        </div>
    )
}

const FileItemEditMenu = ({ content }) => {
    const dispatch = useDispatch()
    const [editState, setEditState] = useState({
        'name': ''
    })

    const onInputChange = (e) => {
        setEditState({...editState, [e.target.name]: e.target.value})
    }

    const onEdit = () => {
        axios.patch(`http://localhost:8000/files/${content.pk}/`, 
        editState, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            dispatch(fetchFileList)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='flex items-center justify-between w-full my-1 border rounded-md shadow-md p-5'>
            <div className='flex flex-col text-center'>
                <label htmlFor='name' className='pb-2'>Name:</label>
                <input 
                    onChange={onInputChange}
                    className='border rounded-md outline-none p-2 bg-gray-100 shadow-md'
                    placeholder='Enter new file name'
                    name='name'
                    type='text'
                    autoComplete='off'
                />
            </div>
            <button
                onClick={onEdit}
                className='rounded-md bg-indigo-600 hover:bg-indigo-800 shadow-md text-white px-5 py-2'
            >
                Edit
            </button>
        </div>
    )
}

const FileItem = ({ content }) => {
    const [isEditing, setIsEditing] = useState(false)

    const onEdit = () => { setIsEditing(prev => !prev) }

    return (
        <>
            <div className='flex items-center justify-between w-full my-1 border rounded-md shadow-md p-5'>
                <div className='flex items-center justify-center'>
                    <div className='mx-5'>Name: { content.file }</div>
                    <div className='mx-5'>Size: { content.size } bytes</div>
                </div>
                <FileItemMenu content={content} onEdit={onEdit} isEditing={isEditing} />
            </div>
            { isEditing && <FileItemEditMenu content={ content }/> }
        </>
    )
}

const FilesList = ({ files }) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='font-bold text-5xl my-5 py-5 text-center w-full border-b'>Your Files</div>
            <div className='flex flex-col w-full my-5'>
                { 
                    files.map((file, key) => {
                        return (
                            <FileItem key={key} content={file} />
                        )
                    }) 
                }
            </div>
        </div>
    )
}

export default FilesList
