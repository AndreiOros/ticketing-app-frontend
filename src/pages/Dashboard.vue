<template>
    <v-container>
        <v-row>
            <v-col class="card-container">
                <BoardCard :board="board" v-for="(board, id) in store.boards" :key="id" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import { boardsStore } from '@/stores/boards'

import BoardCard from '@/components/dashboard/BoardCard.vue'

const store = boardsStore()

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
</style>
