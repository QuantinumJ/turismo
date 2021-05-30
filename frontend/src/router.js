import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Reserva from './components/Reserva.vue'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                //requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                //requiresAuth: true
            }
        },
        {
            path: '/reserva/:id',
            name: 'Reserva',
            component: Reserva,
            meta: {
                //requiresAuth: true
            }
        },
    ]
})



export default router