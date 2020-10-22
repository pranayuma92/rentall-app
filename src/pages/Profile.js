import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Card, Media, Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectToken } from '../redux/selectors'
import { request } from '../utils/API'
import { currency } from '../utils/helpers'

import Edit from '../assets/edit.svg'
import Avatar from '../assets/user.svg'
import swal from 'sweetalert'

const Profile = ({ auth, history }) => {
    const [user, setUserdata] = useState({})
    const [myStuff, setMyStuff] = useState([])

    useEffect(() => {
        if(auth.get('isAuthenticated')){
            setUserdata(auth.get('userData').toJS())
        }
    },[auth])

    useEffect(() => {
       getMyStuff()
    }, [user])

    const getMyStuff = () => {
        request('get', `stuff?authorId=${user.id}`)
            .then(res => setMyStuff(res))
            .catch(err => console.log(err))
    }

    const handleDelete = stuff => {
        swal(`Hapus ${stuff.title}?`,'','warning', {
            buttons: ['Batal', 'Konfirmasi']
        }).then( value =>{
            if(value){
                console.log(stuff)
                request('delete', `stuff/${stuff.id}`)
                    .then(res => {
                        swal('Berhasil dihapus', '', 'success')
                        getMyStuff()
                    })
                    .catch(err => swal('Terjadi kesalahan', '', 'error'))
            }
        })
    }

    return (
        <Container className="profile-page">
            <Row className="mt-5 mb-5">
                <Col md={2}>
                    {   user && user.profileImg
                            ? (<Image src={user.profileImg} roundedCircle width={150} />)
                            : (<Image src={Avatar} width={150} />)
                    }
                </Col>
                <Col md={10}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>{`${user.firstname} ${user.lastname}`}
                            <Image 
                                onClick={() => history.push(`/user/${user.id}`)} 
                                className="ml-3" src={Edit} height={20} style={{cursor: 'pointer'}}/>
                        </h3>
                        <Button variant="success" onClick={() => history.push('/post')}>Publikasi Baru</Button>
                    </div>
                    <div>
                        <h5>Publikasi saya</h5>
                    </div>
                    <Table className="mt-4" hover>
                        { myStuff.length === 0 && <h3 className="text-center">Anda belum mempublikasi barang</h3>}
                        <tbody>
                            {  myStuff.map(stuff => (
                                <tr key={stuff.id}>
                                    <td className="text-center">
                                        <Image src={stuff.pic} width={80}/>
                                    </td>
                                    <td>
                                        <h5>{stuff.title}</h5>
                                        <div dangerouslySetInnerHTML={{__html: stuff.desc}}></div>
                                    </td>
                                    <td>
                                        <p>Rp. {currency(stuff.price)} <small className="text-muted">/{stuff.priceUnit}</small></p>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end">
                                            <Button onClick={() => handleDelete(stuff)} className="mr-3" variant="outline-danger">Hapus</Button>
                                            <Button className="mr-3" onClick={() => history.push(`/post?edit=${stuff.id}`)} variant="outline-warning">Edit</Button>
                                            <Button onClick={() => history.push(`/detail/${stuff.id}`)} variant="outline-info">Lihat</Button>
                                        </div>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                   </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: makeSelectToken()
})

export default connect(mapStateToProps)(Profile)