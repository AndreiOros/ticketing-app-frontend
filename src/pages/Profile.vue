<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="profile-card">
                    <v-card-title>Profile</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="user.first_name"
                                    label="First Name"
                                    bg-color="#e6ebe0"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="user.last_name"
                                    label="Last Name"
                                    bg-color="#e6ebe0"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="user.email"
                                    label="Email"
                                    bg-color="#e6ebe0"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="passwordDialog = true" color="#e6ebe0"
                            >Change Password</v-btn
                        >
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn @click="updateProfile" color="#e6ebe0">Update</v-btn>
                        <v-btn @click="dialog = true" color="#ed6a5a">Delete Account</v-btn>
                    </v-card-actions>
                </v-card>
                <v-dialog v-model="dialog" width="500">
                    <v-card class="profile-card">
                        <v-card-title>Are you sure?</v-card-title>
                        <v-card-text>
                            <p>Are you sure you want to delete your account?</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="dialog = false" color="#e6ebe0">No</v-btn>
                            <v-btn @click="deleteAccount" color="#ed6a5a">Yes</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="passwordDialog" width="500">
                    <v-card class="profile-card">
                        <v-row>
                            <v-col>
                                <v-card-title>Change Password</v-card-title>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="oldPassword"
                                    :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showOldPassword ? 'text' : 'password'"
                                    hint="At least 8 characters"
                                    label="Password"
                                    name="input-10-1"
                                    counter
                                    @click:append="showOldPassword = !showOldPassword"
                                    bg-color="#e6ebe0"
                                    class="mx-auto mt-3"
                                    width="90%"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="newPassword"
                                    :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showNewPassword ? 'text' : 'password'"
                                    hint="At least 8 characters"
                                    label="Password"
                                    name="input-10-1"
                                    counter
                                    @click:append="showNewPassword = !showNewPassword"
                                    bg-color="#e6ebe0"
                                    class="mx-auto mt-3"
                                    width="90%"
                                />
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-btn @click="updatePassword" color="primary">Update</v-btn>
                            <v-btn @click="passwordDialog = false" color="red">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { userStore } from '@/stores/user'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = userStore()

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
})
const dialog = ref(false)
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const passwordDialog = ref(false)
const oldPassword = ref('')
const newPassword = ref('')

const updateProfile = async () => {
    await store.updateUser(user.value)
}

const deleteAccount = async () => {
    await store.deleteUser(user.value.id)
    router.push('/login')
}

const updatePassword = async () => {
    await store.updatePassword(oldPassword.value, newPassword.value)
}

onBeforeMount(() => {
    user.value = { ...store.user }
})
</script>

<style scoped>
.passwordDialog {
    padding: 20px;
}
.profile-card {
    margin-top: 20px;
    padding: 20px;
    width: 500px;
    margin: 50px auto;
    background-color: #9bc1bc;
    color: #e6ebe0;
}
</style>
