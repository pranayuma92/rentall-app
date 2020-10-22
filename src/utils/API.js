import axios from 'axios'
import { reject } from 'lodash'

const DEV_URL = 'http://localhost:5000/'
const URL = 'https://rentall-server.herokuapp.com/'

export const request = (method, flag = null, data = null, rest = null) => {
    const config = {
        method: method,
        url: DEV_URL + flag ,
        data: data,
        ...rest
    }

    const promise = new Promise((resolve, reject) => {
        axios(config)
            .then( response => resolve(response.data))
            .catch(error => reject(error))
    })

    return promise
}

export const uploadImage = (reader, file) => {
    const promise = new Promise((resolve, reject) => {
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
                resolve(res.data.data.display_url)
            })
            .catch(err => reject(err))
        
        }
    })

    return promise
}