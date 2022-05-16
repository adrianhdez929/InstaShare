import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-feather'


const mockItems = [
    {
        content: '#Test 1 @ahdez929'
    },
    {
        content: 'Text@gmail.com in a nutshell https://google.com and some file://downloads'
    }
]

const TaskTextTag = ({ text }) => {
    return (
        <span className='flex items-center rounded-full bg-purple-300 px-2 text-purple-600'>
            <Icon.Hash className='mx-1' size={16} /> 
            {text.substring(1, text.length)}
        </span>
    )
}

const TaskTextLink = ({ text }) => {
    return (
        <button className='flex items-center rounded-full bg-indigo-300 px-2 text-indigo-600'>
            <Icon.Link className='mx-1' size={16} /> 
            {text}
        </button>
    )
}

const TaskTextMail = ({ text }) => {
    return (
        <button className='flex items-center rounded-full bg-amber-300 px-2 text-amber-600'>
            <Icon.Mail className='mx-1' size={16} /> 
            {text}
        </button>
    )
}

const TaskTextUser = ({ text }) => {
    return (
        <button className='flex items-center rounded-full bg-green-300 px-2 text-green-600'>
            <img className='rounded-full w-4 mx-1' src='https://avatars.githubusercontent.com/u/43711136?s=40&v=4' alt='avatar' /> 
            {text.substring(1, text.length)}
        </button>
    )
}

const TaskItem = ({ content }) => {
    return (
        <div className='flex my-3 p-2'>
            <div>
                <input type="checkbox" />
            </div>
            <div className='flex mx-3'>
                { content.split(' ').map((word, key) => {
                    if (word[0] === '#')
                        return <TaskTextTag text={word} key={key} />
                    if (word[0] === '@')
                        return <TaskTextUser text={word} key={key} />
                    if (word.includes('@'))
                        return <TaskTextMail text={word} key={key} />
                    if (word.includes('://'))
                        return <TaskTextLink text={word} key={key} />
                    return <span className='mx-0.5' key={key}>{` ${word} `}</span>
                }) }
            </div>
        </div>
    )
}

const TasksList = ({ tasks }) => {
    return (
        <div className='my-3'>
            { tasks.map((task, key) => {
                return (
                    <TaskItem content={task.content} key={key} />
                )
            }) }
        </div>
    )
}

export default TasksList
