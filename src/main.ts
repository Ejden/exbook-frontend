import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import './assets/css/global.css';
import VueCompositionApi from '@vue/composition-api';
import VueI18n from 'vue-i18n';
import pl from '@/assets/i18n/messages_pl-PL';

axios.defaults.withCredentials = true;
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://localhost:8082/';
}
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    const currentRoute = router.currentRoute.name;
    store.commit('clearUser');
    if (currentRoute != 'Login') {
      router.push({ name: 'Login' });
    }
  }
});

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'pl',
  messages: {
    pl: pl
  }
});

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  i18n: i18n
}).$mount('#app');
