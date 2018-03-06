// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueGoodTable from 'vue-good-table'
import VueGallery from 'vue-gallery'
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/ionicons/dist/css/ionicons.css'
import './assets/css/style.css'
import 'aos/dist/aos.css'
import * as VueGoogleMaps from '../node_modules/vue2-google-maps/src/main'
import {constants, axios} from './bootstrap'
import store from './store'

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + store.getters.getToken
    return config
  },
  error => Promise.reject(error)
)
axios.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  console.log(error.response)
  let originalRequest = error.config
  console.log(originalRequest.headers)
  if (error.response.status === 401 && !originalRequest._retry) {
    // if the error is 401 and has'nt already been retried
    originalRequest._retry = true // now it can be retried
    const userDetails = JSON.parse(localStorage.getItem('user_details'))
    if (userDetails) {
      var data = {
        'user_id': userDetails.id,
        'access_token': store.getters.getToken
      }
      console.log(data)
      return axios.post('/refresh-token', data)
        .then((resp) => {
          console.log(resp.data)
          store.dispatch('tokenRefreshed', resp.data.token)
          originalRequest._retry = true
          console.log('refreshed')
          // retry the request that errored out
          return axios(originalRequest)
        })
        .catch((error) => {
          console.log(error)
          store.dispatch('logout')
          console.log('reauthenticate')
          window.location.href = '/login'
        })
    }
  }
  if (error.response.status === 404 && !originalRequest._retry) {
    originalRequest._retry = true
    window.location.href = '/login'
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$constants = constants

Vue.use(ElementUI)
Vue.use(VueGoodTable)
Vue.use(VueGallery)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBLFLAneQG9du2zGkCekOrGOYumicdLJOc',
    libraries: 'places,drawing,visualization'
  }
})
locale.use(lang)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
