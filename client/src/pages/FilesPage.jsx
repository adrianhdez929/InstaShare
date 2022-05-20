import React, { useEffect, useState } from "react"
import axios from "axios"

import DefaultView from "../views/DefaultView"

import AddFile from "../components/files/AddFile"
import FilesList from "../components/files/FilesList"

const FilesPage = () => {
    const [files, setfiles] = useState([])

    useEffect(() => {
        if (files.length === 0)
            axios.get('http://localhost:8000/files/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setfiles(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <DefaultView>
            <AddFile />

            <FilesList files={files} />
        </DefaultView>
    )
}

export default FilesPage
