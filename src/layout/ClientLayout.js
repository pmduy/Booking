import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import withLayout from 'hoc/withLayout'
import React from 'react'

function ClientLayout(props) {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}
export default withLayout(ClientLayout)