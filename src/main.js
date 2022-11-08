import Vue from 'vue';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router';
import setAuthHeader from './utils/setAuthHeader';

import VueSweetalert2 from 'vue-sweetalert2';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './plugins/fontawesome'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'leaflet/dist/leaflet.css';

Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.config.devtools = false;

// * Comprobamos si existe un token almacenado en local
// * Si no lo hay, lo almacenaremos al hacer login
if (localStorage.JWT) {
    setAuthHeader(localStorage.JWT);
} else {
    setAuthHeader(false);
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
