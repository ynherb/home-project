import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import beforeGuard from './beforeGuard'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
const LoginRegistration = () => import('../views/formLoginReistrarion.vue')


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'LoginRegistration',
    component: LoginRegistration,
    beforeEnter: function (to, from, next) {
     (!store.getters.users) ? next() : next('/Home');
    }
  },
  
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    beforeEnter: beforeGuard
  },
  {
    path:'/About',
    name: 'About',
    component: About,
    beforeEnter: beforeGuard
  },
  {
    path: '*',
    redirect: '/Home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
