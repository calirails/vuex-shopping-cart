<template>
  <div>
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="cartedItem in shoppingCart" :key='cartedItem.id'>
        Product: {{ cartedItem.title }} - {{ cartedItem.price | asCurrency }} - {{ cartedItem.quantity }}
        <br/>
      </li>
    </ul>
    <h4>Total: {{ preTaxTotal | asCurrency }}</h4>
    <!-- Note: this now requires 'cart' as the namespaced prefix -->
    <button @click="$store.dispatch('cart/checkout')"
      :disabled="shoppingCart.length === 0"
      >Check out</button>
    <h4>{{ checkoutStatusMessage }}</h4>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  // Data state moved from here to Vuex store
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      // Note: This (state) parameter is implicitly rootState so we need to provide the full path
      //       Truth be told, we should avoid mapState and use mapGetters with its namespace to avoid ambiguity.
      checkoutStatusMessage: (state) => {
        console.log({state})
        return state.cart.checkoutStatusMessage
      }
    }),
    ...mapGetters("cart", {
      shoppingCart: 'shoppingCart',
      preTaxTotal: 'shoppingCartTotal'
    })
  }
}
</script>
