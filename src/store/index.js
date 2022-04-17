import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import property from './modules/property'
import notification from './modules/notification'
import plan from './modules/plan'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    property,
    notification,
    plan
  }
})

export default store
