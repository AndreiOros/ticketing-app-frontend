<template>
    <v-card class="card" flat>
        <v-card-title>{{ comment.author }}</v-card-title>
        <v-card-text>{{ comment.text }}</v-card-text>
        <v-card-text>{{ comment.created_at }}</v-card-text>
    </v-card>
</template>

<script setup>
const props = defineProps({
    comment: Object
})
</script>

<style scoped>
.card {
    margin: 10px;
    background-color: #9b9999;
}
</style>
