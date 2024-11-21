<template>
    <div>
        <v-navigation-drawer app>
            <v-list>
                <v-list-item link @click="router.push('/dashboard')">Dashboard</v-list-item>
                <v-list-item link>Settings</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app>
            <span>The Ticketing App</span>
            <v-spacer />
            <v-btn @click="logout" icon="mdi-logout"></v-btn>
        </v-app-bar>
        <v-main>
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
