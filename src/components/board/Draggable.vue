<template>
    <div>
        <draggable
            v-model="cards"
            group="cards"
            @start="drag = true"
            @end="drag = false"
            item-key="title"
        >
            <template #item="{ element }">
                <v-card class="ma-4" @mousedown="setCurrentCard(element)">
                    <v-toolbar color="transparent">
                        <template v-slot:append>
                            <!-- <v-btn icon="mdi-dots-vertical" @click="isMenuOpened = true" /> -->
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        icon="mdi-dots-vertical"
                                        variant="text"
                                        v-bind="props"
                                    ></v-btn>
                                </template>
                                <v-list class="menu-list">
                                    <v-list-item @click="selectCard(element)">
                                        <v-list-item-title>View</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="deleteCard(element)">
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-toolbar>
                    <v-card-title>{{ element.title }}</v-card-title>
                    <v-card-text>{{ element.description }}</v-card-text>
                </v-card>
            </template>
        </draggable>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'

const props = defineProps({
    list: Object
})
const emit = defineEmits({
    updateCardPosition: (payload) => {
        return typeof payload.list === 'object' && Array.isArray(payload.cardsList)
    },
    selectCard: (card) => {
        return typeof card === 'object'
    },
    deleteCard: (card, list) => {
        return typeof card === 'object' && typeof list === 'object'
    }
})

const drag = ref(false)
const currentCard = ref(null)

const cards = computed({
    get: () => props.list.cards,
    set: async (value) => {
        emit('updateCardPosition', {
            list: props.list,
            cardsList: value,
            card: currentCard.value
        })
    }
})

const selectCard = (card) => {
    emit('selectCard', card)
}

const setCurrentCard = (card) => {
    currentCard.value = card
}

const deleteCard = (card) => {
    const cardIndex = cards.value.findIndex((c) => c.title === card.title)
    emit('deleteCard', props.list, cardIndex)
}
</script>

<style scoped></style>
