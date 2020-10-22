import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import { request } from '../utils/API'
import { getUrlParam, notification } from '../utils/helpers'
import { createStructuredSelector } from 'reselect'
import { makeSelectToken } from '../redux/selectors'
import { toast } from 'react-toastify'
import swal from 'sweetalert'

const AddStuff = ({ auth, history }) => {
    const [author, setAuthor] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [category, setCategory] = useState(null)
    const [price, setPrice] = useState(0)
    const [unit, setUnit] = useState(null)
    const [cover, setCover] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const id = getUrlParam('edit')
        const userData = auth.get('userData').toJS()
        setUser(userData)

        if(id){
            request('get', `stuff/${id}`)
                .then(res => {
                    if(res.authorId === userData.id){
                        setAuthor(res.authorId)
                        setTitle(res.title)
                        setContent(res.desc)
                        setPrice(res.price)
                        setCover(res.pic)
                        setUnit(res.priceUnit)
                        setCategory(res.cat)
                        setEdit(true)
                    } else {
                        history.push('/post')
                        toast.error('Anda tidak memiliki akses untuk mengedit post ini')
                    }
                })
                .catch(err => console.log(err))
        }
    }, [])

    const handleImageChange = e => {
        setUploading(true)
	    const self = this
	    e.preventDefault();
	    let file = e.target.files[0]
	    let reader = new FileReader()
	    reader.readAsDataURL(file);
	    reader.onload = () => {
            const data = new FormData()
            data.append('image', reader.result.split(',')[1] )
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload?key=4c917ab6b878a2abd7b7e6a6bcedb569',
                headers: {
                    'content-type': 'multipart/form-data'
                },
                data: data
            })
            .then(res => {
                setCover(res.data.data.display_url)
                setUploading(false)
            })
            .catch(err => console.log(err))
	    }
    }

    const handlePublish = () => {
        const data = {
            id: Math.random().toString(36).substr(2, 6),
            title: title,
            desc: content,
            cat: category,
            price: price,
            priceUnit: unit,
            pic: cover,
            authorId: user.id 
        }

        if(!title || !content || !category || !price || !unit || !cover){
            swal('Form tidak boleh kosong', '','warning')
            return
        }

        swal('Publikasi post ini?', {
            buttons: ['Batal', 'Ya']
        }).then(value => {
            if(value){
                const method = isEdit ? 'put' : 'post'
                const url = getUrlParam('edit') ? `stuff/${getUrlParam('edit')}` : 'stuff'  
        
                request(method, url, data)
                    .then(res => {
                        swal('Post berhasil di publikasi', '', 'success')
                            .then(() => history.replace('/profile'))
                    })
                    .catch(err => console.log(err))
            }
        })

    }

    return (
        <>
        <Editor 
            content={content}
            title={title}
            cover={cover}
            price={price}
            unit={unit}
            category={category}
            handleCover={handleImageChange} 
            handleContent={value => setContent(value)}
            handleTitle={e => setTitle(e.target.value)}
            handleCategory={e => setCategory(e.target.value)} 
            handleUnit={e => setUnit(e.target.value)}
            handlePrice={e => setPrice(e.target.value)}
            handlePublish={handlePublish}
            uploadStatus={uploading}
            isEdit={isEdit}

        />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: makeSelectToken()
})

export default connect(mapStateToProps)(AddStuff)