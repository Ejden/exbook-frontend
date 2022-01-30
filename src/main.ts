import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import './assets/css/global.css';
import VueCompositionApi from '@vue/composition-api';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8082/';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
