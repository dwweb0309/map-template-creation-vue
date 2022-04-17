import Vue from 'vue'
import api from '@/api'
import router from '../../router'

export default {
  namespaced: true,

  state: {
    token: null,
    user: {
      email: null,
      username: null,
      roles: []
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_AUTH_DATA(state, user) {
      if (user) {
        state.user.email = user.email
        state.user.username = user.username
        state.user.role = user.roles[0].name
      }
    },
  },
  actions: {
    async signIn({ commit }, payload) {
      const response = await api.post('auth/login', payload)

      commit('SET_TOKEN', response.data.token)
      commit('SET_AUTH_DATA', response.data.user)

      Vue.$cookies.set('token', response.data.token)
    },
    async signUp({ commit }, payload) {
      const response = await api.post('auth/register', payload)

      commit('SET_TOKEN', response.data.token)
      commit('SET_AUTH_DATA', response.data.user)

      Vue.$cookies.set('token', response.data.token)
    },
    async logout ({ commit }) {
      await api.get('/auth/logout')
      
      commit('SET_TOKEN', null)
      commit('SET_AUTH_DATA', null)
      
      Vue.$cookies.remove('token')
      router.push('/auth/signin')
    },
    async resetPassword ({ commit }, payload) {
      console.log(commit)
      await api.post('/auth/reset-password', payload)
    }
  },
  getters: {
    isAuth: (store) => {
      return store.token
    }
  }
}