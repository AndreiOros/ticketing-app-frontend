/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from './routes'

import { isLoggedIn } from '../utils/utils.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = isLoggedIn()

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect to login if not authenticated
        next('/login')
    } else if (!to.meta.requiresAuth && isAuthenticated && to.path === '/login') {
        // Redirect to dashboard if already logged in
        next('/dashboard')
    } else {
        next() // Proceed to the requested route
    }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
    if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
        if (!localStorage.getItem('vuetify:dynamic-reload')) {
            console.log('Reloading page to fix dynamic import error')
            localStorage.setItem('vuetify:dynamic-reload', 'true')
            location.assign(to.fullPath)
        } else {
            console.error('Dynamic import error, reloading page did not fix it', err)
        }
    } else {
        console.error(err)
    }
})

router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
