import React, { useEffect, useState } from 'react'
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap'
import { request } from '../utils/API'
import Logo from '../assets/rentall-logo.png'
import { connect } from 'react-redux'
import { doLoginRequest } from '../redux/thunks'
import { createStructuredSelector } from 'reselect'
import { makeSelectToken } from '../redux/selectors'
import swal from 'sweetalert'

const Login = ({ location, auth, onDoLogin, history }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    console.log(location)

    useEffect(() => {
        if(auth.get('isAuthenticated')){
            (location.state !== undefined)
                ? history.push(location.state.from)
                : history.push('/profile')
        }
    },[auth.get('isAuthenticated')])

    const handleLogin = () => {
        if(!email || !password) {
            swal('Form tidak boleh kosong', '', 'warning')
            return
        }
        
        onDoLogin({ email, password })
    }

    console.log(auth.toJS())

    return (
        <Container className>
            <Row className="justify-content-md-center align-items-center mt-5 mb-5">
                <Col md={6} className="box-login">
                    <div className="text-center mt-3 mb-5 logo-box">
                        <img src={Logo} height={40}/>
                    </div>
                    <FormControl type="text" placeholder="Email" className="mb-3" onChange={(e) => setEmail(e.target.value)}/>
                    <FormControl type="password" placeholder="Kata Sandi" className="mb-3" onChange={(e) => setPassword(e.target.value)}/>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button onClick={handleLogin}>Masuk</Button>
                        <Button>Daftar</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: makeSelectToken()
})

const mapDispatchToProps = dispatch => ({
    onDoLogin: data => dispatch(doLoginRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)