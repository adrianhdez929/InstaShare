import React from 'react'

import ContentContainer from '../components/shared/ContentContainer'
import Navbar from '../components/shared/Navbar'


const DefaultView = ({children}) => {
    return (
        <>
            <Navbar />

            <ContentContainer>
                { children }
            </ContentContainer>
        </>
    )
}

export default DefaultView
