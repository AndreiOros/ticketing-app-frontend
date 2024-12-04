<template>
    <v-card class="card">
        <v-form v-model="valid">
            <v-row>
                <v-col class="mx-auto" cols="12" md="8">
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        bg-color="#e6ebe0"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="8" class="mx-auto">
                    <v-text-field
                        v-model="password"
                        label="password"
                        required
                        type="password"
                        bg-color="#e6ebe0"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" class="mx-auto d-flex justify-center">
                    <v-btn :disabled="!valid" color="#ed6a5a" @click="login"> Login </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login'])

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
    emit('login', email.value, password.value)
}
</script>

<style scoped>
.card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 600px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #9bc1bc;
    color: #e6ebe0;
}
</style>
