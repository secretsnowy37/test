import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Roles from '@/components/Roles'
import Reports from '@/components/Reports'
import SFRReport from '@/components/reports/SFRReport'
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
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/roles',
      name: 'Roles',
      component: Roles,
      beforeEnter: requireAuth
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      beforeEnter: requireAuth
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: requireAuth
    },
    {
      path: '/reports/SFRReport',
      name: 'SFRReport',
      component: SFRReport,
      beforeEnter: requireAuth
    }
  ]
})
