import React, { useRef } from 'react'
import ReactQuill from 'react-quill'
import { Container, Row, Col, FormControl, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Add from '../assets/photo.svg'

import 'react-quill/dist/quill.snow.css'

const Editor = ({
    history, 
    title, 
    handleTitle, 
    cover, 
    handleCover, 
    content,
    category, 
    handleContent, 
    handlePublish, 
    handleCategory, 
    unit, 
    handleUnit, 
    price, 
    handlePrice,
    uploadStatus,
    isEdit
}) => {
    const refInput = useRef(null)
	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		    [{ 'font': [] }],
		    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
		    [{ 'align': [] }],
		    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
		    ['link'],
		    ['clean']
		],
		clipboard: {
		    matchVisual: false,
		}
    }
    
    const categories = ['Elektronik', 'Kendaraan', 'Rumah Tangga', 'Properti', 'Industri', 'Hobi']
    const units = ['Jam', 'Hari', 'Bulan', 'Tahun']

	const formats = [
	  'header', 'font', 'size',
	  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
	  'list', 'bullet', 'indent',
	  'link', 'image', 'video'
	]

	const handleBtn = () => {
		refInput.current.click()
    }
    
    const test ='<p>test</p>'

	return (
		<Container className="mt-5 mb-5 editor-box">
			<Row>
				<Col md={8}>
                    <FormControl  
                        className="mb-3"
						value={title || ''} 
						onChange={handleTitle} 
						type="text" 
						placeholder="Judul..."/>
					<ReactQuill 
						value={content} 
						onChange={handleContent} 
						modules={modules} 
						formats={formats} 
						placeholder={'Tulis deskripsi barang sewa anda...'} />
				</Col>
				<Col md={4}>
                    <div onClick={handleBtn} className="img-placeholder">
                        { cover ? <img src={cover} /> : <img className="add" src={Add} /> }
                    </div>
                    { uploadStatus && <small className="text-muted mt-3">Mengunggah gambar...</small>}
                    <div className="mb-4 mt-4">
                        <h5>Harga Sewa</h5>
                        <FormControl type="number" placeholder="Masukkan harga sewa barang" value={price} onChange={handlePrice} />
                    </div>
                    {/* <Form.Group controlId="category">
                        <Form.Label>Kategori</Form.Label>
                        <Form.Control name="category" as="select" defaultValue="Pilih kategori">
                            <option>Pilih kategori</option>
                            {
                                categories.map( label => (
                                    <option key={label} value={label.replace(' ', '-').toLowerCase()}>{label}</option>
                                ))
                            }  
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="priceunit">
                        <Form.Label>Satuan unit sewa</Form.Label>
                        <Form.Control name="category" as="select" defaultValue="Pilih kategori">
                            <option>Pilih kategori</option>
                            {
                                categories.map( label => (
                                    <option key={label} value={label.replace(' ', '-').toLowerCase()}>{label}</option>
                                ))
                            }  
                        </Form.Control>
                    </Form.Group> */}
                    <Row>
                        <Col md={6}>
                            <div className="mb-4">
                                <h5>Kategori</h5>
                                {
                                    categories.map( label => (
                                        <Form.Check 
                                            key={label}
                                            type="radio"
                                            label={label}
                                            value={label.replace(' ', '-').toLowerCase()}
                                            onChange={handleCategory}
                                            checked={category === label.replace(' ', '-').toLowerCase() ? true : false}
                                            name="category"
                                        />
                                    ))
                                }    
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-4">
                                <h5>Durasi Sewa</h5>
                                {
                                    units.map( label => (
                                        <Form.Check 
                                            key={label}
                                            type="radio"
                                            label={label}
                                            value={label.replace(' ', '-').toLowerCase()}
                                            onChange={handleUnit}
                                            checked={unit === label.replace(' ', '-').toLowerCase() ? true : false}
                                            name="rentunit"
                                        />
                                    ))
                                }  
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end mt-5">
                        <Button onClick={() => history.goBack()} className="mr-3" variant="outline-danger">Batal</Button>
                        <Button onClick={handlePublish} variant="primary">{isEdit? 'Perbarui': 'Publikasi'}</Button>
                    </div>				
				</Col>
			</Row>
			<input ref={refInput} accept="image/*" type="file" id="choose" onChange={handleCover} style={{display: 'none'}}/>
		</Container>
	)
}

export default withRouter(Editor)