<template>
    <div>
        <v-navigation-drawer app>
            <v-list>
                <v-list-item link>Dashboard</v-list-item>
                <v-list-item link>Settings</v-list-item>
            </v-list>
            <v-btn @click="logout">Logout</v-btn>
        </v-navigation-drawer>
        <v-app-bar app>
            <span>Admin Layout Header</span>
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
