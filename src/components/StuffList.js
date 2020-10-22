import React from 'react'
import { Row, Alert } from 'react-bootstrap'

import StuffItem from './StuffItem'

const StuffList = ({ stuff = [], grid }) => {
    if(stuff.length === 0) return <Alert variant="danger">Barang tidak tersedia</Alert>
    return (
        <Row>
            { stuff.map(item => <StuffItem item={item} key={item.id} grid={grid} />) }
        </Row>
    )
}

export default StuffList