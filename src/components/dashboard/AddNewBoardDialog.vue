<template>
    <div>
        <v-dialog v-model="isOpened" max-width="500px">
            <v-card class="dialog-card">
                <v-card-title>Add new board</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newBoard.name" label="Board name" bg-color="#9bc1bc" />
                </v-card-text>
                <v-card-text>
                    <v-textarea
                        v-model="newBoard.description"
                        label="Board description"
                        bg-color="#9bc1bc"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="emit('closeDialog')">Cancel</v-btn>
                    <v-btn @click="emit('addNewBoard', newBoard)">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    isAddBoardDialogOpen: Boolean
})

const emit = defineEmits('closeDialog', 'addNewBoard')

const isOpened = ref(false)
const newBoard = ref({
    name: '',
    description: ''
})

watch(
    () => props.isAddBoardDialogOpen,
    (value) => {
        isOpened.value = value
    }
)
</script>

<style scoped>
.dialog-card {
    background-color: #e6ebe0;
}
</style>
