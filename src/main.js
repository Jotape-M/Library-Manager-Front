import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false,
});

window.Toast = Toast;

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: function(h) {
        return h(App);
    },
}).$mount('#app');
