<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="password" label="password" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn :disabled="!valid" color="primary" @click="login">Login</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-btn color="primary" @click="test">Test</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script setup>
import { ref } from 'vue'

import { userStore } from '../stores/user.js'
import { boardsStore } from '../stores/boards.js'

const store = userStore()
const store2 = boardsStore()

const valid = ref(false)
const password = ref('')
const email = ref('')
const emailRules = ref([
    (value) => {
        if (value) return true

        return 'E-mail is required.'
    },
    (value) => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    }
])

const login = () => {
    store.loginUser(email.value, password.value)
}

const test = () => {
    store2.fetchBoards()
}
</script>
