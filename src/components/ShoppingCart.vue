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
    <button @click="$store.dispatch('checkout')"
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
      checkoutStatusMessage: 'checkoutStatusMessage'
    }),
    ...mapGetters({
      shoppingCart: 'shoppingCart',
      preTaxTotal: 'shoppingCartTotal'
    })
  }
}
</script>
  
