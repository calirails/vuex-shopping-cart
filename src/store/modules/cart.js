import productApi from '../../api/productApi'

const state = {
  purchasables: [],    
  // checkout status message
  checkoutStatusMessage: "Checkout after you add items to your purchasables."
}

const getters = {
  // Note: added 'rootGetters' since we are going to use it to cross navigate from this 
  //       cart store to the product store in our use of the productCatalog getter.
  shoppingCart: (state, getters, rootState, rootGetters) => {
    // return a product by joining in the title from our Product Catalog
    return state.purchasables.map((cartItem) => {
      const { id, quantity } = cartItem
      // Note: this changed from 'getters' to 'rootGetters' and uses
      //       the product namespace to resolve the same getter as before
      const { title, price } = rootGetters['product/productCatalog'].find((prod) => prod.id === cartItem.id)
      return {
        id,
        title,
        price,
        quantity,
      }
    })
  },
  shoppingCartTotal: (state, getters) => {
    const initialSum = 0
    return getters.shoppingCart.reduce((accumulator, product) => accumulator + product.quantity * product.price, initialSum)
  },
}

const mutations = {
  updateProductsInCart(state, payload) {
    // Ensure we got a well defined product
    if (!payload || !payload.id || !payload.quantity || !payload.price) {
      return
    }

    // check if product already before adding or incrementing
    const { id, quantity, price } = payload
    const productInCart = state.purchasables.find((product) => product.id === payload.id)
    if (!productInCart) {
      // add the product with its defined quantity
      state.purchasables.push({ id, quantity, price })
    } else {
      // simply increment exising product in purchasables with additive quantity
      productInCart.quantity += quantity
    }
  },   
  setCheckoutStatus(state, payload) {
    state.checkoutStatusMessage = payload
  },
  clearCart(state, payload) {
    state.purchasables = []
  }
}

const actions = {
  addProductToCart(context, product) {
    // Fake remote call by making this asynchronous
    if (product && product.quantity) {
      // Update Cart Purchasables
      context.commit('updateProductsInCart', product)
      // NOTE: since this product store mutation is external to the cart store, we need
      //       to prefix the name of the mutation with 'product' along with the 3rd parameter
      //       i.e. {root: true} to instruct Vuex to traverse to the root level to locate
      //       the product store.
      // Update Inventory
      context.commit('product/updateInventory', product, {root: true})
    }
  },
  checkout(context) {
    console.log('store::checkout::action starting')
    productApi.buyProducts(
      context.rootState.product.purchasables, // note this access rootState rather than local state
      () => { 
        context.commit('setCheckoutStatus', 'Order created successfully.')
        context.commit('clearCart')
      },
      () => {
        context.commit('setCheckoutStatus', 'Checkout Failed. Please try again?')
      }
    )
    console.log('store::checkout::action exiting')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}