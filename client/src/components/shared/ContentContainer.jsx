import React from "react"


const ContentContainer = ({ children }) => {
    return (
        <div className="h-screen m-3">
            <div className="w-full py-5 px-10">
                { children }
            </div>
        </div>
    )
}

export default ContentContainer
