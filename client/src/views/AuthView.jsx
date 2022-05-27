import React from 'react'

import ContentContainer from '../components/shared/ContentContainer'


const AuthView = ({children}) => {
    return (
        <>
            <ContentContainer>
                { children }
            </ContentContainer>
        </>
    )
}

export default AuthView
