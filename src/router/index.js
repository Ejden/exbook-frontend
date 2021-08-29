import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import NewOffer from "@/views/NewOffer";
import CreatedOffer from "@/views/CreatedOffer";
import Offer from "@/views/Offer";
import Listing from "@/views/Listing";
import CategoryDetailsView from "@/views/CategoryDetailsView";
import Error from "@/views/Error";

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
    },
    {
        path: '/listing',
        name: 'Listing',
        component: Listing,
        props: route => ({
            search: route.query.search,
            categoryId: route.query.categoryId,
            condition: route.query.condition,
            type: route.query.type,
            priceFrom: route.query.priceFrom,
            priceTo: route.query.priceTo,
            location: route.query.location,
            sort: route.query.sort,
            page: route.query.page
        }),
        meta: {requiresAuth: false}
    },
    {
        path: '/category/:categoryName',
        name: 'CategoryDetailsView',
        component: CategoryDetailsView,
        meta: { requiresAuth: false }
    },
    {
        path: '/error',
        name: 'Error',
        component: Error,
        meta: { requiresAuth: false }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.baseURL,
    routes
})

export default router