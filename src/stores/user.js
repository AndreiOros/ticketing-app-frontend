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
        async loginUser(email, password) {
            try {
                const response = await api.login(email, password)
                this.user = response.data.user
                backend.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}
