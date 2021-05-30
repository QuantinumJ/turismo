import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import 'bootstrap'

import "../style/main.scss"
Vue.prototype.$http = Axios

const etoken = 'yT5bjLR!pLV0WRolekwOrY5o5oqfLW2OkQDEuPXNO4TtYK15vShiZ9oqOD9vcCXgKl4pZCTX9CzFLkkT0qK2J0qFJnDrUWG*2zGpOkgUxikJw81W2q2uSMjp*Te9yn4KjNDUmjwKcRf4XotoQwe7ecA8RV3r!W*zgsVD9xBKrgijMwKDtieloB1BnEScH19Ctag8E6gipNtJO11V*5iPIlqhU97mUkonCxH8zCAJj1kX0hzhnWdCWSLBLYW28fmd'
if (etoken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'etoken ' + etoken
}
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')