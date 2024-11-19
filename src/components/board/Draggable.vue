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
    updateCard: (payload) => {
        return typeof payload.list === 'object' && Array.isArray(payload.cardsList)
    }
})

const drag = ref(false)
const currentCard = ref(null)

const cards = computed({
    get: () => props.list.cards,
    set: async (value) => {
        emit('updateCard', {
            list: props.list,
            cardsList: value,
            card: currentCard.value
        })
    }
})

const setCurrentCard = (card) => {
    currentCard.value = card
    console.log('card: ', currentCard.value)
}
</script>
