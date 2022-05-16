import React from 'react'

import ContentContainer from '../components/shared/ContentContainer'
import Footer from '../components/shared/Footer'


const AuthView = ({children}) => {
    return (
        <>
            <ContentContainer>
                { children }
            </ContentContainer>
            
            <Footer />
        </>
    )
}

export default AuthView
