import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import Home from '../views/HomeView.vue';
import Register from '../views/RegisterView.vue';
import Login from '../views/LoginView.vue';
import NewOffer from '@/views/NewOfferView.vue';
import CreatedOffer from '@/views/CreatedOfferView.vue';
import Offer from '@/views/OfferView.vue';
import Listing from '@/views/ListingView.vue';
import CategoryDetailsView from '@/views/CategoryDetailsView.vue';
import Error from '@/views/ErrorView.vue';
import NotFound from '@/views/NotFoundView.vue';
import MyAccount from '../views/MyAccountView.vue';
import Checkout from '@/views/BasketView.vue';
import BasketTransactionView from '@/views/BasketTransactionView.vue'
import PurchaseRealisedView from '@/views/PurchaseRealisedView.vue';
import OrderDetailsView from '@/views/OrderDetailsView.vue';
import SoldOrderDetailsView from '@/views/SoldOrderDetailsView.vue';
import MyOrdersView from '@/views/MyOrdersView.vue';
import SoldOrdersView from '@/views/SoldOrdersView.vue';
import MyOffersView from '@/views/MyOffersView.vue';

Vue.use(VueRouter);

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
        props: (route: Route) => ({
            search: route.query.search,
            categoryId: route.query.categoryId,
            condition: route.query.condition,
            offerType: route.query.offerType,
            priceFrom: route.query.priceFrom,
            priceTo: route.query.priceTo,
            location: route.query.location,
            sort: route.query.sort,
            page: route.query.page
        }),
        meta: {requiresAuth: false}
    },
    {
        path: '/my-account/order/:orderId',
        name: 'OrderDetails',
        component: OrderDetailsView,
        meta: {requiresAuth: true}
    },
    {
        path: '/my-account/my-orders',
        name: 'MyOrders',
        component: MyOrdersView,
        meta: {requiresAuth: true}
    },
    {
        path: '/sale/orders/:orderId',
        name: 'SoldOrderDetails',
        component: SoldOrderDetailsView,
        meta: {requiresAuth: true}
    },
    {
        path: '/sale/orders',
        name: 'SoldOrders',
        component: SoldOrdersView,
        meta: {requiresAuth: true}
    },
    {
        path: '/sale/offers',
        name: 'MyOffers',
        component: MyOffersView,
        meta: {requiresAuth: true}
    },
    {
        path: '/category/:categoryName',
        name: 'CategoryDetailsView',
        component: CategoryDetailsView,
        meta: {requiresAuth: false}
    },
    {
        path: '/error',
        name: 'Error',
        component: Error,
        meta: {requiresAuth: false}
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {requiresAuth: true}
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: {requiresAuth: true}
    },
    {
        path: '/transaction',
        name: 'Transaction',
        component: BasketTransactionView,
        meta: {requiresAuth: true}
    },
    {
        path: '/purchase-realised',
        name: 'PurchaseRealised',
        component: PurchaseRealisedView,
        meta: {requiresAuth: true}
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
        meta: {requiresAuth: false}
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.baseURL,
    routes
});

export default router;
