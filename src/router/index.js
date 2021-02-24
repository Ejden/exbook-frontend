import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
        meta: {guest: true}
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {guest: true}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.baseURL,
    routes
})

export default router