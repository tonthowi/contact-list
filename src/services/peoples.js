import axios from 'axios'

const baseUrl = 'http://localhost:3000/peoples' // Replace 'http://localhost:3000/peoples' with the actual API endpoint.

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = () => {
    const request = axios.put(baseUrl)
    return request.then(response => response.data)
}

const remove = () => {
    const request = axios.delete(baseUrl)
    return request.then(response => response.data)
}

export default {getAll, create, update, remove}