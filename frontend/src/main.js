import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
Vue.prototype.$http = Axios
const token = ""
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Token ' + token
}
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')