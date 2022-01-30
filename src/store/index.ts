import Vuex, {Store} from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import UserModule, {IUserState} from "@/store/modules/user-store/user-store";
import {initializeStores} from "@/utils/store-accessor";
import OfferStore from "@/store/modules/offer-store/OfferStore";

Vue.use(Vuex);

const homeUrl = window.location.origin;

export interface IRootState {
    user: IUserState;
}

const initializer = (store: Store<any>) => initializeStores(store);

export default new Vuex.Store<IRootState>({
    modules: {
        user: UserModule,
        offer: OfferStore
    },
    getters: {
        homeUrl: () => homeUrl
    },
    plugins: [createPersistedState(), initializer]
});
