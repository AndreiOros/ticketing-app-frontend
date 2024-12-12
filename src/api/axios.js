import axios from 'axios'

const backend = axios.create({
    baseURL: 'http://backend:8000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export { backend }
