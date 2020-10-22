import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import StuffList from '../components/StuffList'
import { request } from '../utils/API'

const Search = ({ match }) => {
    const [result, setResult] = useState([])

    useEffect(() => {
        try{
            request('get', `stuff?title_like=${encodeURI(match.params.query)}`)
                .then(res => setResult(res))
        } catch(err){
            console.log(err)
        }
    },[])
    return (
        <Container>
            <div>Hasil penelusuran dari "{match.params.query}" : {result.length} hasil</div>
            <StuffList stuff={result} />
        </Container>
    )
}

export default Search