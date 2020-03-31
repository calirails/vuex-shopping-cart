import Vue from 'vue'
import Vuex from 'vuex'
import productApi from '@/api/productApi.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    productsCount: (state) => state.products.length,
    availableProducts: (state, getters) => {
      return state.products.filter((prod, index) => prod.inventory > 0)
    }
  },
  mutations: {
    setProducts(state, payload) {
      // update 
      state.products = payload
    }
  },
  actions: {
    // fetch from remote sources and mutate state with results
    fetchProducts(context) {
      // Fake remote call by making this asynchronous
      return new Promise((resolve, reject) => {
        productApi.getProducts((productsFromApi) => {
          context.commit('setProducts', productsFromApi)
          resolve()
        })
      })
    }    
  }
})