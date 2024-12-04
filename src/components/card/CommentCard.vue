<template>
    <v-card class="card" flat>
        <v-card-title>{{ author }}</v-card-title>
        <v-card-text>{{ comment.text }}</v-card-text>
        <v-card-text>{{ date }}</v-card-text>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    comment: Object
})

const author = computed(() => {
    return `${props.comment.author.first_name} ${props.comment.author.last_name}`
})

const date = computed(() => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }
    return new Date(props.comment.created_at).toLocaleString('en-GB', options)
})
</script>

<style scoped>
.card {
    margin: 10px;
    background-color: #9bc1bc;
    color: white;
}
</style>
