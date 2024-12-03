import { isLoggedIn } from '../utils/utils.js'

export const routes = [
    {
        path: '/',
        redirect: () => (isLoggedIn() ? '/dashboard' : '/login')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue'),
        meta: { layout: 'loginLayout', requiresAuth: false }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { layout: 'defaultLayout', requiresAuth: true }
    },
    {
        path: '/board/:id',
        name: 'Board',
        component: () => import('../pages/Board.vue'),
        meta: { layout: 'defaultLayout', requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../pages/Profile.vue'),
        meta: { layout: 'defaultLayout', requiresAuth: true }
    }
]
