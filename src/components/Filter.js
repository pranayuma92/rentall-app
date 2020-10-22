import React, { useRef, useState } from 'react'
import { Form, Collapse } from 'react-bootstrap'
import Up from '../assets/up-chevron.svg'
import Down from '../assets/down-chevron.svg'

const Filter = ({ handleCategory, handleUnit }) => {
    const categories = ['Elektronik', 'Kendaraan', 'Rumah Tangga', 'Properti', 'Industri', 'Hobi']
    const [openCat, setOpenCat] = useState(true)
    const [openUnit, setOpenUnit] = useState(true)

    return (
        <div className="filter-wrapper">
            <h5 >Filter</h5>
            <div className="mb-4 category-section">
                <div 
                    className="d-flex justify-content-between align-items-center category-bar"
                    onClick={() => setOpenCat(!openCat)}
                    aria-controls="category-section"
                    aria-expanded={openCat}>
                        <h4>Kategori</h4>
                        <img src={openCat ? Up : Down} width={15} height={15}/>
                </div>
                <Collapse in={openCat}>
                    <div id="category-section" className="mb-3 mt-1">
                        {
                            categories.map( label => (
                                <Form.Check 
                                    key={label}
                                    type="checkbox"
                                    label={label}
                                    name="cat"
                                    value={label.replace(' ', '-').toLowerCase()}
                                    onChange={handleCategory}
                                />
                            ))
                        }    
                    </div>
                </Collapse>
            </div>
            <div className="mb-4 unit-section">
                <div 
                    className="d-flex justify-content-between align-items-center unit-bar"
                    onClick={() => setOpenUnit(!openUnit)}
                    aria-controls="unit-section"
                    aria-expanded={openUnit}>
                    <h4>Satuan Sewa</h4>
                    <img src={openUnit ? Up : Down} width={15} height={15}/>
                </div>
                <Collapse in={openUnit}>
                    <div id="unit-section" className="mb-3 mt-1">
                        {
                            ['Tahun','Bulan','Hari','Jam'].map( label => (
                                <Form.Check 
                                    key={label}
                                    type="checkbox"
                                    label={label}
                                    name="priceUnit"
                                    value={label.replace(' ', '-').toLowerCase()}
                                    onChange={handleUnit}
                                />
                            ))
                        }    
                    </div>
                </Collapse>
            </div>
            <div className="mb-4 location-section">
                <div className="d-flex justify-content-between align-items-center location-bar">
                    <h4>Lokasi</h4>
                    <img src={Down} width={15} height={15}/>
                </div>
            </div>
        </div>
    )
}

export default Filter