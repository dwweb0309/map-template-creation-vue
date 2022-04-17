import api from '@/api'

export default {
  namespaced: true,

  state: {
    plans: [
    ]
  },
  mutations: {
    SET_PLANS(state, plans) {
      state.plans = plans
    }
  },
  actions: {
    getAllPlans: async ({ commit }) => {
      const response = await api.get('plans')
      
      commit('SET_PLANS', response.data.plans)
    }
  }
}