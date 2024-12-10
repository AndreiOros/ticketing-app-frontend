import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'
import { backend } from '@/api/axios.js'

import { api } from '../api/api.js'

export const userStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        setUser(user) {
            this.user = user
        },
        async getUser() {
            try {
                const token = localStorage.getItem('authToken')
                if (token) {
                    backend.defaults.headers.common['Authorization'] = `Token ${token}`
                }
                const response = await api.getUser()
                this.user = response.data[0]
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        async updateUser(user) {
            try {
                const response = await api.updateUser(user)
                this.user = response.data
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        async updatePassword(oldPassword, newPassword) {
            try {
                await api.updatePassword(this.user.id, oldPassword, newPassword)
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        async deleteUser(id) {
            try {
                await api.deleteUser(id)
                this.logout()
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        async loginUser(email, password) {
            try {
                const response = await api.login(email, password)
                this.user = response.data.user
                backend.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
                localStorage.setItem('authToken', response.data.token)
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        logout() {
            this.user = null
            delete backend.defaults.headers.common['Authorization']
            localStorage.removeItem('authToken')
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}
