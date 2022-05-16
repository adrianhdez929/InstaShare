import axios from "axios"
import React, { useState } from "react"
import * as Icon from 'react-feather'


const TaskMenuButton = ({icon, text}) => {
    return (
        <button className="flex rounded-md shadow-md bg-gray-200 hover:bg-gray-400 py-2 px-5">
            {icon} {text}
        </button>
    )
}

const TaskMenu = ({ content }) => {
    const onTaskAdd = () => {
        axios.post('http://localhost:8000/tasks/new/', {
            content: content
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                            <TaskMenuButton icon={<Icon.Maximize2 className="mr-3" />} text="Open" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mx-1">
                            <TaskMenuButton icon={<Icon.Calendar className="mr-3" />} text="Today" />
                        </div>
                        <div className="mx-1">
                            <TaskMenuButton icon={<Icon.Unlock className="mr-3" />} text="Public" />
                        </div>
                        <div className="mx-1">
                            <TaskMenuButton icon={<Icon.Loader className="mr-3" />} text="Highlight" />
                        </div>
                        <div className="mx-1">
                            <TaskMenuButton icon={<Icon.MinusCircle className="mr-3" />} text="Estimation" />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="mx-1">
                        <button className="rounded-md shadow-md bg-gray-200 hover:bg-gray-400 py-2 px-5">Cancel</button>
                    </div>
                    <div className="mx-1">
                        <button 
                            onClick={onTaskAdd}
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

const AddTask = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [content, setContent] = useState("")

    const onTextChange = (e) => {
        setContent(e.target.value)
    }

    return (
        <div 
            onFocus={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(true)}}
            onBlur={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false)}}
            className='flex flex-col'
        > 
            <div className={`flex items-center ${isFocused ? "border rounded-md pb-5" : ""}`}>
                <Icon.PlusSquare className="mx-2" color='blue' />
                <input
                    onChange={onTextChange}
                    className="w-full outline-none px-2 py-2"
                    placeholder="Type to add new task"
                    value={content}
                />            
            </div>
            { isFocused ? <TaskMenu content={content} /> : null}
        </div>
    )
}

export default AddTask
