import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios-config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    loginStatus: '',
    userDetails: JSON.parse(localStorage.getItem('user_details')) || {},
    userType: localStorage.getItem('user_type') || ''
  },
  getters: {
    getToken: state => state.token,
    isAuthenticated: state => !!state.token,
    getUserDetails: state => state.userDetails,
    getUserType: state => state.userType
  },
  mutations: {
    loginRequest (state) {
      state.loginStatus = 'Processing'
    },
    loginSuccess (state, resp) {
      state.loginStatus = 'Success'
      state.token = resp.data.token
      state.userDetails = resp.data.userdetails
      state.userType = 'staff'
    },
    loginError (state, err) {
      state.loginStatus = err.data.message
    },
    logout (state) {
      state.token = ''
      state.userDetails = {}
      state.loginStatus = ''
      state.userType = ''
    },
    tokenRefreshed (state, token) {
      state.token = token
    }
  },
  actions: {
    login ({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {
        commit('loginRequest')
        axios.post('login', credentials)
          .then(resp => {
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('user_type', 'staff')
            localStorage.setItem('user_details', JSON.stringify(resp.data.userdetails))
            axios.defaults.headers.common['Authorization'] = resp.data.token
            commit('loginSuccess', resp)
            // dispatch(USER_REQUEST)
            resolve(resp)
          })
          .catch(err => {
            commit('loginError', err.response)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user_type')
        localStorage.removeItem('user_details')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    tokenRefreshed ({commit, dispatch}, token) {
      return new Promise((resolve, reject) => {
        commit('tokenRefreshed', token)
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        resolve()
      })
    }
  }

})
