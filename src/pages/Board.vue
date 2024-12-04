<template>
    <v-container fluid>
        <v-row>
            <v-card class="mt-3 mb-3 mr-11" style="width: 100%">
                <v-card-title>{{ board.name }}</v-card-title>
                <v-card-text>{{ board.description }}</v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-col v-for="(list, id) in board.lists" :key="id">
                <v-row>
                    <v-card class="cards-list-title">
                        {{ list.title }}
                    </v-card>
                </v-row>
                <Draggable
                    :list="list"
                    @updateCardPosition="updateCardPosition"
                    @selectCard="selectCard"
                    @deleteCard="deleteCard"
                />
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

        <CardView
            :isAddCardDialogOpen="isViewCardDialogOpen"
            :card="selectedCard"
            @saveCard="saveCard"
            @closeDialog="isViewCardDialogOpen = false"
        />
    </v-container>
</template>

<script setup>
import { boardsStore } from '@/stores/boards'
import { computed, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'

import Draggable from '@/components/board/Draggable.vue'
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

const saveCard = (data) => {
    const newBoard = { ...store.currentBoard }
    const listIndex = newBoard.lists.findIndex((l) => l.id === data.card.list)
    const cardIndex = newBoard.lists[listIndex].cards.findIndex((c) => c.id === data.card.id)
    newBoard.lists[listIndex].cards[cardIndex] = data.card
    newBoard.lists[listIndex].cards[cardIndex].comments.push(data.comment)
    store.updateBoardWithNewCard(newBoard)
    if (!data.comment) {
        isViewCardDialogOpen.value = false
    }
}

const deleteCard = async (list, cardIndex) => {
    const newBoard = { ...store.currentBoard }
    const listIndex = newBoard.lists.findIndex((l) => l.id === list.id)
    newBoard.lists[listIndex].cards.splice(cardIndex, 1)
    for (let i = 0; i < newBoard.lists[listIndex].cards.length; i++) {
        newBoard.lists[listIndex].cards[i].position = i
    }
    await store.updateBoardWithNewCard(newBoard)
}

onBeforeMount(async () => {
    await store.getCurrentBoard(route.params.id)
})

watch(
    () => store.currentBoard,
    async (value) => {
        if (selectCard.value) {
            const listIndex = value.lists.findIndex((l) => l.id === selectCard.value.list)
            const cardIndex = value.lists[listIndex].cards.findIndex(
                (c) => c.id === selectCard.value.id
            )
            selectedCard.value = value.lists[listIndex].cards[cardIndex]
        }
    }
)
</script>

<style scoped>
.add-button {
    position: fixed;
    bottom: 50px;
    right: 60px;
}
.board-name-row {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    background-color: white;
}
.board-description-row {
    font-size: 16px;
    margin-top: 10px;
    background-color: white;
}
.cards-list-title {
    margin-top: 20px;
    background-color: white;
    width: 100px;
    margin-left: 110px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
}
</style>
