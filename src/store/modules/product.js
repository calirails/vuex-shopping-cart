import productApi from '@/api/productApi.js'

const state = {
  // list of offers we sell with following structured attributes:
  // [{id, title, price, inventory}]
  offers: []
}

const getters = {
  productCatalog: (state, getters) => state.offers,
  isProductInStock: (state, getters) => (product) => state.offers.find((p) => p.id === product.id).inventory > 0,
  lowStockItems: (state, getters) => (inStockQuantity) => state.offers.filter((p) => p.inventory < inStockQuantity)
}

const mutations = {
  setProducts(state, payload) {
    // update 
    state.offers = payload
  },
  updateInventory(state, payload) {
    // Ensure we got a well defined product
    if (!payload || !payload.id || !payload.quantity) {
      return
    }

    // check if product already before adding or incrementing
    const { id, quantity } = payload
    const productInStock = state.offers.find((product) => product.id === payload.id)
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
  },
  setCheckoutStatus(state, payload) {
    state.checkoutStatusMessage = payload
  },
  clearCart(state, payload) {
    state.cart = []
  }
}

const actions = {
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
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}