import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import { IUserStore } from './modules/user-store/user-store';
//import newOfferStore from './modules/offer-store/OfferStore';

Vue.use(Vuex);

export interface IRootState {
    userM: IUserStore;
}

export default new Vuex.Store<IRootState>({
    plugins: [createPersistedState()]
});

// export default new Vuex.Store({
//     modules: {
//         UserStore,
//         //newOfferStore
//     },
//     state: {
//         homeUrl: window.location.origin
//     },
//     getters: {
//         homeUrl: state => state.homeUrl
//     },
//     plugins: [createPersistedState()],
// });
