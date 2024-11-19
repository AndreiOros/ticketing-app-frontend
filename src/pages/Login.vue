<template>
    <v-container class="container">
        <LoginForm @login="login" />
    </v-container>
</template>
<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { userStore } from '../stores/user.js'

import { useRouter } from 'vue-router'

const store = userStore()
const router = useRouter()

const login = async (email, password) => {
    await store.loginUser(email, password)
    router.push({ name: 'Dashboard' })
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
