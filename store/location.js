export const state = () => ({
  error: null,
  locations: []
})

export const mutations = {
  SET_ERROR (state, error) { state.error = error },
  CLEAR_ERROR (state) { state.error = null }
}

export const actions = {
  async getLocations ({ commit }) {
    try {
      const response = await this.$axios.get('/locations')
      
      commit('SET_LOCATIONS', response.data.locations)
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async createLocation ({ commit }, payload) {
    try {
      const response = await this.$axios.post('/locations', payload)

      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
  async updateLocation ({ commit }, payload) {
    try {
      const response = await this.$axios.put(`/${payload.mapId}/locations/${payload.id}`, payload)

      return response
    } catch (err) {
      console.log(err)
      commit('SET_ERROR', err.response.data)
    }
  },
  async getLocation ({ commit }, id) {
    try {
      const response = await this.$axios.get(`/${payload.mapId}/locations/${id}`)
      
      return response
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  },
}
