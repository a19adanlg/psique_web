import Vue from 'vue';
import App from './App.vue';

import router from './router';
import setAuthHeader from './utils/setAuthHeader';

import VueSweetalert2 from 'vue-sweetalert2';

import { BootstrapVue } from 'bootstrap-vue/dist/bootstrap-vue.esm.min.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendar, faChevronLeft, faUserNurse, faStethoscope, faEye, faEdit, faTrash, faMapPin, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

import './plugins/fontawesome'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'leaflet/dist/leaflet.css';

library.add(faCalendar, faChevronLeft, faUserNurse, faStethoscope, faEye, faEdit, faTrash, faMapPin, faUser, faUsers)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSweetalert2);
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
