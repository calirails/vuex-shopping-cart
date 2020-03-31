import Vue from 'vue'
import Vuex from 'vuex'
import productApi from '@/api/productApi.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // list of products we sell depicted as [{product-object}]
    products: [], 
    // carted items as a list of products depicted as [{id, quantity}]
    cart: [],     
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
    },
    updateProductsInCart(state, payload) {
      // Ensure we got a well defined product
      if (!payload || !payload.id || !payload.quantity) {
        return
      }

      // check if product already before adding or incrementing
      const { id, quantity } = payload
      const productInCart = state.cart.find((product) => product.id === payload.id)
      if (!productInCart) {
        // add the product with its defined quantity
        state.cart.push({ id, quantity })
      } else {
        // simply increment exising product in cart with additive quantity
        productInCart.quantity += quantity
      }
    },
    updateInvetory(state, payload) {
      // Ensure we got a well defined product
      if (!payload || !payload.id || !payload.quantity) {
        return
      }

      // check if product already before adding or incrementing
      const { id, quantity } = payload
      const productInStock = state.products.find((product) => product.id === payload.id)
      if (!productInStock) {
        throw new Error('Product cannot be carted because it does not exist as part of our Product Catalog. Was it delisted?')
      } else if (productInStock.inventory < quantity) {
        throw new Error('Product is in-stock but requested quantity: ${quantity} exceeds in-stock quantity: ${productInStock.inventory}.')
      }
      else 
      {
        // decrement in-stock quantity
        productInStock.inventory -= quantity
      }
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
    },
    addProductToCart(context, product) {
      // Fake remote call by making this asynchronous
      if (product && product.quantity) {
        // Update Cart
        context.commit('updateProductsInCart', product)
        // Update Inventory
        context.commit('updateInvetory', product)
      }
    }    
  }
})