<template>
    <v-dialog v-model="isOpened" max-width="500px">
        <v-card class="view-card-card">
            <v-card-title>{{ selectedCard.title }}</v-card-title>
            <v-row class="ma-4">
                <v-col>
                    <v-textarea v-model="selectedCard.description" label="Card description" />
                </v-col>
                <v-col>
                    <v-virtual-scroll class="scroller" :height="300" :items="selectedCard.comments">
                        <template v-slot:default="{ item }">
                            <CommentCard :comment="item" />
                        </template>
                    </v-virtual-scroll>
                    <v-text-field v-model="newComment.text" label="Add a comment">
                        <template v-slot:append>
                            <v-btn
                                class="save-comment-button"
                                v-bind="props"
                                flat
                                icon="mdi-send"
                                @click="saveComment"
                            />
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-btn class="action-buttons" @click="emit('closeDialog')">Close</v-btn>
                <v-btn class="action-buttons" @click="emit('saveCard', { card: selectedCard })">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { userStore } from '@/stores/user'
import CommentCard from './CommentCard.vue'
import { ref, watch } from 'vue'
const props = defineProps({
    isAddCardDialogOpen: Boolean,
    card: Object
})
const store = userStore()

const emit = defineEmits('closeDialog', 'saveCard', 'saveComment')

const isOpened = ref(false)
const selectedCard = ref(null)
const newComment = ref({
    text: '',
    card: null
})

const saveComment = () => {
    newComment.value.author = store.user
    emit('saveCard', { card: selectedCard.value, comment: newComment.value })

    newComment.value = {
        text: '',
        card: null
    }
}

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
        newComment.value.card = value.id
    }
)
</script>

<style scoped>
.view-card-card {
    background-color: #e6ebe0;
}
.save-comment-button {
    color: #e6ebe0;
    background-color: #ed6a5a;
}
.action-buttons {
    color: #ed6a5a;
}
.scroller {
    background-color: white;
    border: 1px solid #9bc1bc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    overflow-y: auto;
    height: 300px;
}
</style>
