import api from '@/api'

export default {
  namespaced: true,

  state: {
    notifications: [
    ]
  },
  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    }
  },
  actions: {
    getNotifications: async ({ commit }) => {
      const response = await api.get('notifications')
      
      commit('SET_NOTIFICATIONS', response.data.notifications)
    }
  }
}