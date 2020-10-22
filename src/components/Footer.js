import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Logo from '../assets/rentall-logo.png'
import Instagram from '../assets/instagram.svg'
import Facebook from '../assets/facebook.svg'

const Footer = () => {
    return (
        <footer className="bg-secondary">
            <Container>
                <div className="pt-4 pb-4 d-flex justify-content-between align-items-center"> 
                    <div>
                        <img src={Logo} height={30}/>
                    </div>
                    <div className="d-inline-flex">
                        <img src={Instagram} className="mr-3" height={25}/>
                        <img src={Facebook} height={25}/>
                    </div>
                </div>
            </Container>
            <div className="text-center text-light pb-1 pt-2 bg-dark">
                <h6>&copy; 2020 - RentALL</h6>
            </div>
        </footer>
    )
}

export default Footer