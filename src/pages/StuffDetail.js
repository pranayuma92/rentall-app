import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { request } from '../utils/API'
import { getId } from '../utils/helpers'

const StuffDetail = ({ match, history }) => {
    const[single, setSingle] = useState({})

    useEffect(() => {
        try{
            request('get', `stuff/${getId(match.params.title)}`)
                .then(res => setSingle(res))
                .catch(err => history.push(`/error?slug=${match.params.title}`))
        } catch(err){
            history.push(`/error?slug=${match.params.title}`)
        }
    }, [match])
    
    return (
        <Container>
            <Row>
                <Col sm={12} md={8} lg={8}>
                    <div className="side-detail-left">
                        <img src={single.pic}/>
                        <p>{ single.title }</p>
                    </div>
                </Col>
                <Col sm={12} md={4} lg={4}>
                    <Card>
                        <Card.Body>
                            <p>{ single.title }</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    
})

const mapDispatchToProps = dispacth => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StuffDetail)