import React, { useEffect, useState } from "react"
import axios from "axios"

import DefaultView from "../views/DefaultView"

import AddTask from "../components/tasks/AddTask"
import TasksList from "../components/tasks/TasksList"

const TasksPage = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (tasks.length === 0)
            axios.get('http://localhost:8000/tasks/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setTasks(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [tasks])

    return (
        <DefaultView>
            <AddTask />

            <TasksList tasks={tasks} />
        </DefaultView>
    )
}

export default TasksPage
