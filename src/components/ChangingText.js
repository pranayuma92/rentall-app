import React, { useRef, useEffect, useState } from 'react'
import { Container, Jumbotron, Row, Col, FormControl } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const ChangingText = ({ history, text = [] }) => {
    const [query, setQuery] = useState(null)
    const refText = useRef(null)
    let counter = 0

    useEffect(() => {
        const changeText = setInterval(change, 5000)
        return () => clearInterval(changeText)
    }, [refText])

    const change = () => {
        refText.current.innerText = `Rental ${text[counter]}? Bisa!`
        counter++
        if(counter > text.length) { 
            refText.current.innerText = 'Rental apa aja bisa!'
            counter = 0 
        }
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter'){
            history.push(`/search/${query}`)
        }
    }

    return (
        <Jumbotron fluid>
            <Container >
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 ref={refText}>Rental Mobil? Bisa!</h1>
                    <FormControl type="text" placeholder="Cari" className="mr-sm-2" onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKeyPress}/>
                    <div style={{textAlign: 'right', cursor: 'pointer'}} onClick={() => history.push(`/stuff`) }>Pencarian Lanjutan</div>
                </Col>
            </Row>
            </Container>
        </Jumbotron>
    )
}

export default withRouter(ChangingText)