import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import DefaultView from "../views/DefaultView"

import AddFile from "../components/files/AddFile"
import FilesList from "../components/files/FilesList"

import { fetchFileList } from ".././provider/app/actions"
import { getFileList } from "../provider/app/selectors"

const FilesPage = () => {
    const dispatch = useDispatch()
    const fileList = useSelector(getFileList)

    useEffect(() => {
        dispatch(fetchFileList)
    }, [])

    return (
        <DefaultView>
            <AddFile />

            <FilesList files={fileList} />
        </DefaultView>
    )
}

export default FilesPage
