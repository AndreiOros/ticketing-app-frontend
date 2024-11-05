import { defineStore, acceptHMRUpdate } from 'pinia'

import { api } from '../api/api.js'

export const boardsStore = defineStore('boards', {
    state: () => ({
        boards: null
    }),
    actions: {
        setBoards(boards) {
            this.boards = boards
        },
        async fetchBoards() {
            try {
                const response = await api.getBoards()
                this.boards = response.data
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        async createBoard(title) {
            try {
                const response = await api.createBoard(title)
                this.boards.push(response.data)
            } catch (error) {
                console.error(error)
                throw error
            }
        },
        async deleteBoard(id) {
            try {
                await api.deleteBoard(id)
                this.boards = this.boards.filter((board) => board.id !== id)
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(boardsStore, import.meta.hot))
}
