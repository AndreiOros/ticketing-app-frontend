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
                <Dragabble
                    :list="list"
                    @updateCardPosition="updateCardPosition"
                    @selectCard="selectCard"
                />
                <v-row> </v-row>
            </v-col>
        </v-row>
        <AddNewCardDialog
            :isAddCardDialogOpen="isAddCardDialogOpen"
            :lists="board.lists"
            @addNewCard="addNewCard"
            @closeDialog="isAddCardDialogOpen = false"
        />
        <AddNewListDialog
            :isAddListDialogOpen="isAddListDialogOpen"
            :lists="board.lists"
            @addNewList="addNewList"
            @closeDialog="isAddListDialogOpen = false"
        />
        <v-menu location="top">
            <template v-slot:activator="{ props }">
                <v-fab v-bind="props" class="add-button" icon="mdi-plus" />
            </template>

            <v-list>
                <v-list-item v-for="(item, index) in menuOption" :key="index" @click="item.action">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <CardView :isAddCardDialogOpen="isViewCardDialogOpen" :card="selectedCard" />
    </v-container>
</template>

<script setup>
import { boardsStore } from '@/stores/boards'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import Dragabble from '@/components/board/Draggable.vue'
import AddNewCardDialog from '@/components/board/AddNewCardDialog.vue'
import AddNewListDialog from '@/components/board/AddNewListDialog.vue'
import CardView from '@/components/card/CardView.vue'

const store = boardsStore()
const route = useRoute()

const board = computed(() => (store.currentBoard ? store.currentBoard : { name: null }))

const selectedCard = ref(null)
const newList = ref(null)
const changedCard = ref(null)
const isViewCardDialogOpen = ref(false)
const isAddCardDialogOpen = ref(false)
const isAddListDialogOpen = ref(false)
const menuOption = ref([
    { title: 'Add Card', action: () => (isAddCardDialogOpen.value = true) },
    { title: 'Add List', action: () => (isAddListDialogOpen.value = true) }
])

const selectCard = (card) => {
    selectedCard.value = card
    isViewCardDialogOpen.value = true
}

const updateCardPosition = async ({ list, cardsList, card }) => {
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

const addNewCard = async (newCard) => {
    const newBoard = { ...store.currentBoard }
    const listIndex = newBoard.lists.findIndex((l) => l.id === newCard.list)
    newCard.position = newBoard.lists[listIndex].cards.length
    newBoard.lists[listIndex].cards.push(newCard)
    await store.updateBoardWithNewCard(newBoard)
    isAddCardDialogOpen.value = false
}

const addNewList = async (newListData) => {
    const newBoard = { ...store.currentBoard }
    newBoard.lists.push(newListData)
    await store.updateBoardWithNewCard(newBoard)
    isAddListDialogOpen.value = false
}

onBeforeMount(async () => {
    await store.getCurrentBoard(route.params.id)
})
</script>

<style scoped>
.add-button {
    position: fixed;
    bottom: 50px;
    right: 60px;
}
</style>
