import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/new-offer-form/user-store'
import newOfferStore from './modules/new-offer-form/new-offer.store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userStore,
        newOfferStore
    },
    state: {
        homeUrl: window.location.origin
    },
    getters: {
        homeUrl: state => state.homeUrl
    },
    plugins: [createPersistedState()]
})