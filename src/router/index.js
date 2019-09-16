import Vue from 'vue'
import Router from 'vue-router'
import { homeGuard, loginGuard } from './auth-guard'
import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: homeGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: loginGuard
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    }
  ],
  mode: 'history'
})
