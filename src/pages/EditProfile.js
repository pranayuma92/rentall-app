import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Row, Col, Image, Button, FormControl, Form } from 'react-bootstrap'
import swal from 'sweetalert'
import { toast } from 'react-toastify'

import { makeSelectToken } from '../redux/selectors'
import { request, uploadImage } from '../utils/API'
import { getUserDataRequest } from '../redux/thunks'

import Avatar from '../assets/photo.svg'
import IDCard from '../assets/id-card.svg'

const EditProfile = ({ auth, history, onGetUserData }) => {
    const [user, setUserdata] = useState({})

    const [firstname, setFistname] = useState()
    const [lastname, setLastname] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [province, setProvince] = useState()
    const [profileImg, setProfileImg] = useState()
    const [idcardImg, setIdcardImg] = useState()

    const refIdCard = useRef(null)
    const refProfile = useRef(null)

    useEffect(() => {
        if(auth.get('isAuthenticated')){
            setUserdata(auth.get('userData').toJS())
        }
    },[auth])

    useEffect(() => {
        setFistname(user.firstname)
        setLastname(user.lastname)
        setAddress(user.address)
        setCity(user.city)
        setProvince(user.province)
        setProfileImg(user.profileImg)
        setIdcardImg(user.idcardImg)
    }, [user])

    const handleSave = () => {
        const data = {
            firstname,
            lastname,
            email: user.email,
            address,
            city,
            province,
            profileImg,
            idcardImg
        }

        swal('Simpan perubahan?', '', 'warning', {
            buttons: ['Batal', 'Simpan']
        }).then(value => {
            if(value){
                console.log(data)
                request('patch', `users/${user.id}`, data)
                    .then(res => {
                        swal('Berhasil disimpan', '', 'success')
                        onGetUserData(user.id)
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    const handleProfile = e => {
        toast.info('Mengunggah gambar profil')
        e.preventDefault();
	    let file = e.target.files[0]
	    let reader = new FileReader()
        uploadImage(reader, file)
            .then(res => {
                toast.success('Berhasil diunggah')
                setProfileImg(res)
            })
            .catch(err => toast.error('Terjadi kesahalan'))
    }

    const handleIdCard = e => {
        toast.info('Sedang mengunggah')
        e.preventDefault();
	    let file = e.target.files[0]
	    let reader = new FileReader()
        uploadImage(reader, file)
            .then(res => {
                toast.success('Berhasil diunggah')
                setIdcardImg(res)
            })
            .catch(err => toast.error('Terjadi kesahalan'))
    }

    return (
        <Container className="edit-profile-page">
            <Row className="mt-5 mb-5">
                <Col md={2}>
                    { profileImg
                        ? (<Image roundedCircle src={profileImg} width={150} onClick={() => refProfile.current.click()} style={{cursor: 'pointer'}}/>)
                        : (<Image src={Avatar} width={150} onClick={() => refProfile.current.click()} style={{cursor: 'pointer'}}/>)
                    }
                    <input ref={refProfile} type="file" accept="image/*" style={{display: 'none'}} onChange={handleProfile}/>
                </Col>
                <Col md={10}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>{`${firstname} ${lastname}`}</h3>
                        <div>
                            <Button variant="outline-danger" className="mr-3" onClick={() => history.goBack()}>Batal</Button>
                            <Button variant="success" onClick={handleSave}>Simpan</Button>
                        </div>
                    </div>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="userFname">
                                <Form.Label>Nama Depan</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nama Depan" 
                                    value={firstname} 
                                    onChange={(e) => setFistname(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="userLname">
                                <Form.Label>Nama Belakang</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nama Belakang" 
                                    value={lastname} 
                                    onChange={(e) => setLastname(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="userAddress">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Alamat" 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="userCity">
                                <Form.Label>Kota</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Kota" 
                                    value={city} 
                                    onChange={(e) => setCity(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="userProvince">
                                <Form.Label>Provinsi</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Provinsi" 
                                    value={province} 
                                    onChange={(e) => setProvince(e.target.value)} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>KTP <br/><small className="text-muted">*Diperlukan jika anda ingin menyewa barang</small></Form.Label>
                                <div>
                                    { idcardImg 
                                        ? (<Image src={idcardImg} width={150} onClick={() => refIdCard.current.click()} style={{cursor: 'pointer'}}/>)
                                        : (<Image src={IDCard} width={150} onClick={() => refIdCard.current.click()} style={{cursor: 'pointer'}}/>)
                                    }
                                </div>
                                <input ref={refIdCard} type="file" accept="image/*" style={{display: 'none'}} onChange={handleIdCard}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: makeSelectToken()
})

const mapDispatchToProps = dispatch => ({
    onGetUserData: id => dispatch(getUserDataRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)