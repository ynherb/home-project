import Vue from 'vue'
import Vuex from 'vuex'
import Users from './users'
import Notification from './notification'
import Product from './product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	Users,
  	Notification,
  	Product
  }
})
