import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { currency, titleToSlug } from '../utils/helpers'

const StuffItem = ({ item = {}, history, grid }) => {
   
    return (
        <Col md={grid} className="mb-4">
            <Card onClick={() => history.push(`/detail/${titleToSlug(item)}`)}>
                <Card.Img variant="top" src={item.pic} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <small className="text-muted">Panam, Pekanbaru</small>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <strong>Rp. {currency(item.price)} <small className="text-muted">/{item.priceUnit}</small></strong>
                    <small className="text-muted">29 OKT</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default withRouter(StuffItem)
