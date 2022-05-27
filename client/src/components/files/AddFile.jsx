import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { fetchFileList } from "../../provider/app/actions"


const AddFile = () => {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onFileAdd = () => {
        const formData = new FormData()

        formData.append(
            'file',
            file,
            file.name
        )
        formData.append(
            'name',
            file.name
        )

        axios.post('http://localhost:8000/files/', 
            formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'multipart/form-data',
                //'accept': 'multipart/form-data'
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
        <div className="flex items-center justify-center w-full my-5 py-5 border rounded-md shadow-md">
            <div className="flex flex-col text-center px-5">
                <label htmlFor="file" className="font-bold text-xl pb-3">Upload a file</label>
                <input 
                    className="mx-5 p-2"
                    type='file' 
                    name='file'
                    onChange={ onFileChange }
                />
            </div>
            <button 
                className="rounded-md bg-indigo-500 hover:bg-indigo-700 px-5 shadow-md py-1 text-white"
                onClick={ onFileAdd }
                >
                Send
            </button>
        </div>
    )
}

export default AddFile
