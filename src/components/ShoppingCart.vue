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
  </div>
</template>

<script>

export default {
  // Data state moved from here to Vuex store
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    productCatalog(){
      return this.$store.state.products
    },
    shoppingCart() {
      return this.$store.getters.shoppingCart
    }, 
    preTaxTotal() {
      return this.$store.getters.shoppingCartTotal
    }
  },
  created() {
    console.log('ProductList.vue::created starting')
    this.isLoading = true
    this.$store.dispatch('fetchProducts')
      .then(() => this.isLoading = false)
    console.log('ProductList.vue::created exiting')
  },
  methods: {
    addToCart(product) {
      console.log('ProductList.vue::addToCart() starting')
      this.$store.dispatch('addProductToCart', { id: product.id, quantity: 1, price: product.price })
    }
  }
}
</script>
  
