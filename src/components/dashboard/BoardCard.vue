<template>
    <v-card class="card">
        <v-card-item>
            <v-card-title>
                {{ board.name }}
            </v-card-title>
        </v-card-item>

        <v-card-text>
            {{ board.description }}
        </v-card-text>

        <v-spacer />

        <v-card-actions>
            <v-btn class="position-absolute bottom-0 right-0" @click="goToBoard">Go to board</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { boardsStore } from '@/stores/boards'

const props = defineProps({
    board: Object
})

const store = boardsStore()

const router = useRouter()

const goToBoard = async () => {
    await store.setCurrentBoard(props.board.id)
    router.push(`/board/${props.board.id}`)
}
</script>

<style scoped>
.card {
    margin: 10px;
    width: 300px;
    height: 200px;
}
</style>
