<template>
    <div>
        <v-navigation-drawer app class="navigation-drawer">
            <v-list>
                <v-list-item link @click="router.push('/dashboard')">Dashboard</v-list-item>
                <v-list-item link @click="router.push('/profile')">Profile</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            app
            style="
                background-color: #9bc1bc;
                color: white;
                left: 0px !important;
                width: 100% !important;
            "
        >
            <span class="ml-3 app-title">The Ticketing App</span>
            <v-spacer />
            <v-btn @click="logout" icon="mdi-logout"></v-btn>
        </v-app-bar>
        <v-main class="main-app">
            <slot />
        </v-main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'

const router = useRouter()
const store = userStore()

const logout = () => {
    store.logout()
    router.push('/login')
}
</script>

<style scoped>
.navigation-drawer {
    width: 200px !important;
    background-color: #9bc1bc;
    color: #e6ebe0;
    top: 65px !important;
}
.main-app {
    background-color: #e6ebe0;
}
.app-title {
    font-family: 'Caveat', cursive;
    font-size: 30px;
    color: #ed6a5a;
}
</style>
