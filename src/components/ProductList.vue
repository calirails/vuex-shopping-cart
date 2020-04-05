<template>
  <div>
    <h1>Shop "Like it's your Birthday" at Shoe Palace!!</h1>
    <img v-if="isLoading"
      src="https://i.imgur.com/7fIx9TK.gif"
    />
    <div v-else>      
        <h2>Available In-Stock Products</h2>
        <ul>
          <li v-for="product in productCatalog" 
              :key='product.id'
              v-bind:class="{low: lowStockAlert(product)}">
            Product: {{ product.title }} - {{ product.price | asCurrency }} - Quantity In-Stock: {{ product.inventory }}
            <button :disabled="!(isProductInStock(product))"
              @click="addToCart(product)">Add to Cart</button>
          </li>
        </ul>
        <hr>
    </div>
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
      productCatalog: 'products'
    }),
    ...mapGetters({
      shoppingCart: 'shoppingCart',
      isProductInStock: 'isProductInStock',
      lowStockItems: 'lowStockItems'
    })
  },
  created() {
    console.log('ProductList.vue::created starting')
    this.isLoading = true
    this.fetchProducts()
      .then(() => this.isLoading = false)
    console.log('ProductList.vue::created exiting')
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    }),
    addToCart(product) {
      console.log('ProductList.vue::addToCart() starting')
      this.addProductToCart({ id: product.id, quantity: 1, price: product.price })
    },
    lowStockAlert(product) {
      return this.lowStockItems(3).find((p) => p.id === product.id)
    }
  }
}
</script>

<style scoped>
  .low {
    color: red;
  }
</style>
  
