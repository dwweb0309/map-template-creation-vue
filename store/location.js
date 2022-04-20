export const state = () => ({
  locations: []
})

export const mutations = {
  SET_LOCATIONS (state, locations) { state.locations = locations }
}

export const actions = {
  async getLocations ({ commit }, id) {
    try {
      const response = await this.$axios.get(`/locations/${id}`)
      
      commit('SET_LOCATIONS', response.data.locations)
    } catch (err) {
      commit('SET_ERROR', err.response.data)
    }
  }
}
