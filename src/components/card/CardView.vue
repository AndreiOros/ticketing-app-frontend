<template>
    <v-dialog v-model="isOpened" max-width="500px">
        <v-card>
            <v-card-title>{{ selectedCard.title }}</v-card-title>
            <v-row>
                <v-col>
                    <v-textarea v-model="selectedCard.description" label="Card description" />
                </v-col>
                <v-col>
                    <v-virtual-scroll :height="300" :items="selectedCard.comments">
                        <template v-slot:default="{ item }">
                            <CommentCard :comment="item" />
                        </template>
                    </v-virtual-scroll>
                    <v-text-field v-model="newComment" label="Add a comment">
                        <template v-slot:append>
                            <v-btn v-bind="props" flat icon="mdi-send" />
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-btn @click="emit('closeDialog')">Cancel</v-btn>
                <v-btn @click="emit('saveCard', selectedCard)">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import CommentCard from './CommentCard.vue'
import { ref, watch } from 'vue'
const props = defineProps({
    isAddCardDialogOpen: Boolean,
    card: Object
})

const emit = defineEmits('closeDialog', 'saveCard')

const isOpened = ref(false)
const selectedCard = ref(null)
const newComment = ref('')

watch(
    () => props.isAddCardDialogOpen,
    (value) => {
        isOpened.value = value
    }
)
watch(
    () => props.card,
    (value) => {
        selectedCard.value = value
    }
)
</script>
