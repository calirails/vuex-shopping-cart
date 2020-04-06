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
    // Note: This (state) parameter is implicitly rootState so we need to provide the full path
    //       Truth be told, we should avoid mapState and use mapGetters with its namespace to avoid ambiguity.
    ...mapState({
      productCatalog: (state) => {
        console.log({state})
        return state.product.offers
      }
    }),
    ...mapGetters("product", {
      isProductInStock: 'isProductInStock',
      lowStockItems: 'lowStockItems'
    }),
    ...mapGetters("cart", {
      shoppingCart: 'shoppingCart',
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
    // Note: these actions are broken out by namespaces but option 
    ...mapActions("product", {
        fetchProducts: 'fetchProducts',
    }),
    ...mapActions("cart", {
        addProductToCart: 'addProductToCart'
    }),
    // NOTE: alternative to the two broken out mapActions is to
    //       remove namespace parameter and append to action name as follows:
    // ...mapActions({
    //     fetchProducts: 'product/fetchProducts',
    //     addProductToCart: 'cart/addProductToCart'
    // }),
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
  
