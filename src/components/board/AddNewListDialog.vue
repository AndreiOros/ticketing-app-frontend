<template>
    <div>
        <v-dialog v-model="isOpened" max-width="500px">
            <v-card class="dialog-card">
                <v-card-title>Add new List</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newList.title" label="List title" bg-color="#9bc1bc" />
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="emit('closeDialog')" color="#ed6a5a">Cancel</v-btn>
                    <v-btn @click="emit('addNewList', newList)" color="#ed6a5a">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    isAddListDialogOpen: Boolean
})

const emit = defineEmits('closeDialog', 'addNewList')

const isOpened = ref(false)
const newList = ref({
    title: '',
    cards: []
})

watch(
    () => props.isAddListDialogOpen,
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
