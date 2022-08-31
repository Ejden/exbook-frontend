import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import OfferStore from "@/store/modules/offer-store/offer-store";
import UserStore from "@/store/modules/user-store/user-store"
import { OfferStoreState } from '@/store/modules/offer-store/types';
import { UserState } from '@/store/modules/user-store/types';

Vue.use(Vuex);

const homeUrl = window.location.origin;

export interface IRootState {
    user: UserState;
    offer: OfferStoreState;
}

export default new Vuex.Store<IRootState>({
    modules: {
        user: UserStore,
        offer: OfferStore
    },
    getters: {
        homeUrl: () => homeUrl
    },
    plugins: [createPersistedState()]
});
