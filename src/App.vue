<template>
    <v-app>
        <component :is="layout">
            <router-view />
        </component>
    </v-app>
</template>

<script setup>
import defaultLayout from './layouts/defaultLayout.vue'
import loginLayout from './layouts/loginLayout.vue'

import { userStore } from './stores/user'

import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = userStore()

const layout = computed(() => {
    return route.name === 'Login' ? loginLayout : defaultLayout
})

onBeforeMount(() => {
    store.getUser()
})
</script>
