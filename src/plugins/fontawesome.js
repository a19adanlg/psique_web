import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faCalendar, faChevronDown, faChevronLeft, faChevronUp, faUserNurse, faStethoscope, faEye, faEdit, faTrash, faMapPin, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'


library.add(faHome, faCalendar, faChevronDown, faChevronLeft, faChevronUp, faUserNurse, faStethoscope, faEye, faEdit, faTrash, faMapPin, faUser, faUsers)

Vue.component('font-awesome-icon', FontAwesomeIcon);
