import axios from "axios"
import React, { useState } from "react"
import * as Icon from 'react-feather'


const FileMenuButton = ({icon, text}) => {
    return (
        <button className="flex rounded-md shadow-md bg-gray-200 hover:bg-gray-400 py-2 px-5">
            {icon} {text}
        </button>
    )
}

const FileMenu = ({ content }) => {
    const onFileAdd = () => {
        const formData = new FormData()

        formData.append(
            'file',
            content.file,
            content.file.name
        )

        console.log(formData)

        axios.post('http://localhost:8000/files/', {
            content: formData
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'multipart/form-data'
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="w-full">
            <div className="flex justify-between items-center rounded shadow-md border p-3">
                <div className="flex">
                    <div className="px-3 mr-5">
                        <div>
                            <FileMenuButton icon={<Icon.Maximize2 className="mr-3" />} text="Open" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mx-1">
                            <FileMenuButton icon={<Icon.Calendar className="mr-3" />} text="Today" />
                        </div>
                        <div className="mx-1">
                            <FileMenuButton icon={<Icon.Unlock className="mr-3" />} text="Public" />
                        </div>
                        <div className="mx-1">
                            <FileMenuButton icon={<Icon.Loader className="mr-3" />} text="Highlight" />
                        </div>
                        <div className="mx-1">
                            <FileMenuButton icon={<Icon.MinusCircle className="mr-3" />} text="Estimation" />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="mx-1">
                        <button className="rounded-md shadow-md bg-gray-200 hover:bg-gray-400 py-2 px-5">Cancel</button>
                    </div>
                    <div className="mx-1">
                        <button 
                            onClick={onFileAdd}
                            className="rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-800 py-2 px-5"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddFile = () => {
    const [isFocused, setIsFocused] = useState(false)
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

        axios.post('http://localhost:8000/files/', 
            formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'content-type': 'multipart/form-data',
                //'accept': 'multipart/form-data'
            }
        })
        .then(res => {console.log(res.data)})
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
