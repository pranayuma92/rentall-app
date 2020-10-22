import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Filter from '../components/Filter'
import StuffList from '../components/StuffList'
import { request } from '../utils/API'

const Stuff = () => {
    const [stuff, setStuff] = useState([])
    const [getCat, setGetCat] = useState([])
    const [getUnit, setGetUnit] = useState([])
    let params = ''

    useEffect(() => {
        request('get', 'stuff')
            .then(res => setStuff(res))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        handleFilter()
    }, [getCat, getUnit])

    const handleFilter = () => {

        params += (getUnit.length > 0) ? getUnit.join('&').concat('&') : ''
        params += (getCat.length > 0) ? getCat.join('&').concat('&') : ''

        request('get', `stuff/?${params.slice(0, -1)}`)
            .then(res => setStuff(res))
            .catch(err => console.log(err))
    }

    const handleCategory = e => {
        const val = e.target.value
        const name = e.target.name
        const query = `${name}=${val}`
        const exist = getCat.find(item => item === query)
        const cat = getCat.filter(item => item !== query)

        exist ? setGetCat(cat) : setGetCat([...getCat, query])
    }

    const handleUnit = e => {
        const val = e.target.value
        const name = e.target.name
        const query = `${name}=${val}`
        const exist = getUnit.find(item => item === query)
        const unit = getUnit.filter(item => item !== query)

        exist ? setGetUnit(unit) : setGetUnit([...getUnit, query])
    }
    
    return (
        <Container className="mt-5">
            <Row>
                <Col md={3}>
                    <Filter handleCategory={handleCategory} handleUnit={handleUnit}/>
                </Col>
                <Col md={9}>
                    <StuffList stuff={stuff} grid={4} />
                </Col>
            </Row>
        </Container>
    )
}

export default Stuff