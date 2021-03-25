import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import NewOffer from "@/views/NewOffer";
import CreatedOffer from "@/views/CreatedOffer";
import Offer from "@/views/Offer";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {guest: true}
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {guest: true}
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {guest: true}
    },
    {
        path: '/add-offer',
        name: 'NewOffer',
        component: NewOffer,
        meta: {requiresAuth: true}
    },
    {
        path: '/offer/:offerId/new',
        name: 'CreatedOffer',
        component: CreatedOffer,
        meta: {requiresAuth: true}
    },
    {
        path: '/offer/:offerId',
        name: 'Offer',
        component: Offer,
        meta: {requiresAuth: false}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.baseURL,
    routes
})

export default router