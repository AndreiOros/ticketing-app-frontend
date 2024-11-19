<template>
    <v-container>
        <v-row>
            {{ board.name }}
        </v-row>
        <v-row>
            {{ board.description }}
        </v-row>
        <v-row>
            <v-col v-for="(list, id) in board.lists" :key="id">
                <v-row>
                    {{ list.title }}
                </v-row>
                <Dragabble :list="list" @updateCard="updateCard" />
                <v-row> </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { boardsStore } from '@/stores/boards'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import Dragabble from '@/components/board/Draggable.vue'

const store = boardsStore()
const route = useRoute()

const board = computed(() => (store.currentBoard ? store.currentBoard : { name: null }))

const newList = ref(null)
const changedCard = ref(null)

const updateCard = async ({ list, cardsList, card }) => {
    const newBoard = { ...store.currentBoard }
    if (!card && !newList.value) {
        // Change card to another list
        if (!card) {
            newList.value = list
            newList.value.cards = cardsList
            return
        }

        changedCard.value = card

        const oldListIndex = newBoard.lists.findIndex((l) => l.id === list.id)
        const newCardIndex = newList.value.cards.findIndex((c) => c.id === changedCard.value.id)
        const newListIndex = newBoard.lists.findIndex((l) => l.id === newList.value.id)

        newBoard.lists[oldListIndex].cards = cardsList

        changedCard.value.list = newList.value.id

        newList.value.cards[newCardIndex] = changedCard.value

        for (let i = 0; i < newList.value.cards.length; i++) {
            newList.value.cards[i].position = i
        }

        newBoard.lists[newListIndex] = newList.value

        await store.updateBoardWithNewCard(newBoard)

        newList = null
        changedCard = null
    } else {
        // Change card in the same list
        const listIndex = newBoard.lists.findIndex((l) => l.id === list.id)
        newBoard.lists[listIndex].cards = cardsList
        for (let i = 0; i < newBoard.lists[listIndex].cards.length; i++) {
            newBoard.lists[listIndex].cards[i].position = i
        }

        await store.updateBoardWithNewCard(newBoard)
    }
}

onBeforeMount(async () => {
    await store.getCurrentBoard(route.params.id)
})
</script>
