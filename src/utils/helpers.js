import { toast } from "react-toastify"

export const currency= price => {
    let reverse = price.toString().split('').reverse().join('')
	let thousand = reverse.match(/\d{1,3}/g)
    thousand = thousand.join('.').split('').reverse().join('')
    
    return thousand
}

export const titleToEncoded = string => encodeURI(string.replace(/-/g, ' '))

export const titleToSlug = string => string.id + '_' + string.title.replace(/ /g, '-').toLowerCase() 

export const getId = string => string.split('_')[0]

export const getUrlParam = name => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    let results = regex.exec(window.location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export const notification = msg => toast.info(msg)