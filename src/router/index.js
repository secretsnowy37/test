import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (store.getters.isAuthenticated) {
    next()  // we are authorized, continue on to the requested route
  } else {
    next('/login') // they are not authorized, so redirect to login
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
