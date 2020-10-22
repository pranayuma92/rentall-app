import React, { useEffect } from 'react'
import { Navbar, Nav, OverlayTrigger, Popover, Button, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Toggle from './Toggler'
import Logo from '../assets/rentall-logo.png'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import jwt from 'jwt-decode'

import { makeSelectToken } from '../redux/selectors'
import { doLogout } from '../redux/actions'
import { notification } from '../utils/helpers'
import swal from 'sweetalert'


const Header = ({ auth, themeToggler, onDoLogout }) => {
    const theme = window.localStorage.getItem('theme')

    useEffect(() => {

    }, [])
    
    const PopupMenu = () => {
        return (
            <OverlayTrigger
                trigger={['click', 'focus']}
                key="bottom"
                placement="bottom"
                overlay={
                    <Popover id={`popover-positioned-bottom`}>
                    <Popover.Title as="h3">User Menu</Popover.Title>
                    <Popover.Content>
                        <ListGroup variant="flush">
                            <ListGroup.Item><Link to="/dashboard">Dasbor</Link></ListGroup.Item>
                            <ListGroup.Item><Link to="/post">Publikasi baru</Link></ListGroup.Item>
                            <ListGroup.Item><Link to="/profile">Profil</Link></ListGroup.Item>
                        </ListGroup>
                        <Button onClick={handleLogout} variant="outline">Logout</Button>
                    </Popover.Content>
                    </Popover>
                }
                >
                <Image src="https://via.placeholder.com/40x40" roundedCircle />
            </OverlayTrigger>
        )
    }

    const handleLogout = () => {
        swal('Konfirmasi logout', '', 'warning', {
            buttons: ['Batal', 'Logout']
        }).then( value => {
            if(value){
                onDoLogout()
                swal('Logout berhasil', '', 'success')
            }
        })
    }

    return (
        <Navbar bg={theme} variant={theme}>
          
            <Navbar.Brand><img src={Logo} /></Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/" className="nav-link">Beranda</Link>
                <Link to="/profile" className="nav-link">Akun</Link>
                <Link to="/tentang" className="nav-link">Tentang</Link>
            </Nav>
            { auth.get('isAuthenticated') ? (
                <>
                    <Button onClick={handleLogout} variant="outline">Logout</Button>
                </>) : (
                    <Nav>
                        <Link to="/login" className="nav-link">Login</Link>
                    </Nav>
                )
            }
        </Navbar>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: makeSelectToken()
})

const mapDispatchToProps = dispatch => ({
    onDoLogout: () => dispatch(doLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)