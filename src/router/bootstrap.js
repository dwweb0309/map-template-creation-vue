import Vue from 'vue'
import store from '../store'
import api from '../api'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

async function bootstrap() {
  const token = Vue.$cookies.get('token')
  
  if (token) {
    store.commit('auth/SET_TOKEN', token, { root: true })

    try {
      const response = await api.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      store.commit('auth/SET_AUTH_DATA', response.data.user, { root: true })
    } catch (error) {
      Vue.$cookies.remove('token')
      window.location = '/auth/signin'
    }
  } else {
    store.commit('auth/SET_TOKEN', null, { root: true })
  }
}

export default bootstrap