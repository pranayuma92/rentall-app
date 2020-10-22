import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ChangingText from '../components/ChangingText'
import StuffList from '../components/StuffList'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectRequest, makeSelectStuff } from '../redux/selectors'
import { loadStuff } from '../redux/thunks'

const Home = ({ rent, request, onLoadStuff }) => {
    console.log(request.toJS())
    useEffect(() => {
        onLoadStuff()
    }, [])

    const stuff =  rent ? rent.toJS() : []

    return (
        <>
            <ChangingText text={['Motor', 'Kamera', 'Drone']} />
            <Container>
                <StuffList stuff={stuff} grid={3} />
            </Container>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    rent: makeSelectStuff(),
    request: makeSelectRequest()
})

const mapDispatchToProps = dispatch => ({
    onLoadStuff: () => dispatch(loadStuff())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)