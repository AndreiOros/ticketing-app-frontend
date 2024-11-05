import { backend } from './axios.js'

const user = {
    login(email, password) {
        return backend.post('/users/login/', { email, password })
    }
}
const boards = {
    getBoards() {
        return backend.get('/boards/boards/')
    },
    createBoard(title) {
        return backend.post('/boards/', { title })
    },
    deleteBoard(id) {
        return backend.delete(`/boards/${id}/`)
    }
}

const api = {
    ...user,
    ...boards
}

export { api }
