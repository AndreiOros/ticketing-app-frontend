<template>
    <div>
        <v-dialog v-model="isOpened" max-width="500px">
            <v-card>
                <v-card-title>Add new card</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newCard.title" label="Card title" />
                </v-card-text>
                <v-card-text>
                    <v-text-field v-model="newCard.description" label="Card description" />
                </v-card-text>
                <v-select
                    v-model="newCard.list"
                    :items="lists"
                    item-text="title"
                    item-value="id"
                    label="Select list"
                />
                <v-card-actions>
                    <v-btn @click="emit('closeDialog')">Cancel</v-btn>
                    <v-btn @click="emit('addNewCard', newCard)">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    isAddCardDialogOpen: Boolean,
    lists: Array
})

const emit = defineEmits('closeDialog', 'addNewCard')

const isOpened = ref(false)
const newCard = ref({
    title: '',
    description: '',
    list: null
})

watch(
    () => props.isAddCardDialogOpen,
    (value) => {
        isOpened.value = value
    }
)
</script>
