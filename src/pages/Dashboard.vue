<template>
    <v-container>
        <v-row>
            <v-col class="card-container">
                <BoardCard :board="board" v-for="(board, id) in store.boards" :key="id" />
            </v-col>
        </v-row>
        <v-fab
            class="add-button"
            icon="mdi-plus"
            @click="isAddBoardDialogOpen = true"
            color="#ed6a5a"
        />
        <AddNewBoardDialog
            :isAddBoardDialogOpen="isAddBoardDialogOpen"
            @addNewBoard="addNewBord"
            @closeDialog="isAddBoardDialogOpen = false"
        />
    </v-container>
</template>

<script setup>
import AddNewBoardDialog from '@/components/dashboard/AddNewBoardDialog.vue'
import BoardCard from '@/components/dashboard/BoardCard.vue'

import { onBeforeMount, ref } from 'vue'
import { boardsStore } from '@/stores/boards'

import { createDefaultBoard } from '@/utils/utils'

const store = boardsStore()

const isAddBoardDialogOpen = ref(false)

const addNewBord = async (newBoard) => {
    const board = createDefaultBoard(newBoard)
    await store.createBoard(board)
    isAddBoardDialogOpen.value = false
}

onBeforeMount(() => {
    store.fetchBoards()
})
</script>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.add-button {
    position: fixed;
    bottom: 50px;
    right: 60px;
}
</style>
