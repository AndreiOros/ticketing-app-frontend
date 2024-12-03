import { backend } from './axios.js'

const user = {
    async login(email, password) {
        return await backend.post('/users/login/', { email, password })
    },
    async getUser() {
        return await backend.get('/users/users/')
    },
    async updateUser(user) {
        return await backend.put(`/users/users/${user.id}/`, user)
    },
    async deleteUser(id) {
        return await backend.delete(`/users/users/${id}/`)
    },
    updatePassword(id, oldPassword, newPassword) {
        return backend.post(`/users/change-password/`, {
            current_password: oldPassword,
            new_password: newPassword
        })
    }
}
const boards = {
    async getBoards() {
        return await backend.get('/boards/boards/')
    },
    async getBoard(id) {
        return await backend.get(`/boards/boards/${id}/`)
    },
    async createBoard(boardData) {
        return await backend.post('/boards/boards/', boardData)
    },
    async updateBoard(id, newData) {
        return await backend.put(`/boards/boards/${id}/`, newData)
    },
    async deleteBoard(id) {
        return await backend.delete(`/boards/${id}/`)
    }
}

const api = {
    ...user,
    ...boards
}

export { api }
