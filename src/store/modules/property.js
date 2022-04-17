import api from '@/api'

export default {
  namespaced: true,

  state: {
    properties: [
      // {
      //   address: '330 Bourke Street',
      //   city: 'Los Angeles',
      //   state: 'CA',
      //   zip: '90071',
      //   propertyUse: 'Office',
      //   size: '395,955',
      //   unit: '0',
      //   yearBuilt: '1982',
      //   lastUpdate: 'May 21, 2021',
      //   mortgageDate: 'May 21, 2021'
      // }
    ],
    propertyTypes: [
    ]
  },
  mutations: {
    SET_TYPES(state, types) {
      state.propertyTypes = types
    },
    SET_PROPERTIES(state, properties) {
      state.properties = properties
    }
  },
  actions: {
    getProperties: async ({ commit }) => {
      try {
        const response = await api.get('properties')

        commit('SET_PROPERTIES', response.data.properties)
      } catch (err) {
        console.log(err)
      }
    },
    getPropertyTypes: async ({ commit }) => {
      try {
        const response = await api.get('properties/types')

        commit('SET_TYPES', response.data.types.map((v) => ({ ...v, showSubTypes: false })))
      } catch (err) {
        console.log(err)
      }
    }
  }
}