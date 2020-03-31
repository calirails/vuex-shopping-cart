<template>
  <div>
    <h1>Shop "Like it's your Birthday" at Shoe Palace!!</h1>
    <img v-if="isLoading"
      src="https://i.imgur.com/rIag3Cr.gif"
    />
    <div v-else>      
        <h2>All Products List</h2>
        <ul>
          <li v-for="product in products" :key='product.id'>
            Product: {{ product.title }} - {{ product.price }} - Quantity In-Stock: {{ product.inventory }}
            <button :disabled="!product.inventory"
              @click="addToCart(product)">Add to Cart</button>
          </li>
        </ul>
        <h2>Available In-Stock Products</h2>
        <ul>
          <li v-for="product in products" :key='product.id'>
            Product: {{ product.title }} - {{ product.price }}
            <br/>
          </li>
        </ul>
    </div>
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
    products(){
      return this.$store.state.products
    },
    availableProducts() {
      return this.$store.getters.availableProducts
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
      this.$store.dispatch('addProductToCart', { id: product.id, quantity: 1 })
    }
  }
}
</script>
  
