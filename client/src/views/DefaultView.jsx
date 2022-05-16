import React from 'react'

import ContentContainer from '../components/shared/ContentContainer'
import Footer from '../components/shared/Footer'
import Navbar from '../components/shared/Navbar'


const DefaultView = ({children}) => {
    return (
        <>
            <Navbar />

            <ContentContainer>
                { children }
            </ContentContainer>
            
            <Footer />
        </>
    )
}

export default DefaultView
