<template>
  <div>
    <h1>Shop "Like it's your Birthday" at Shoe Palace!!</h1>
    <img v-if="isLoading"
      src="https://i.imgur.com/7fIx9TK.gif"
    />
    <div v-else>      
        <h2>Available In-Stock Products</h2>
        <ul>
          <li v-for="product in productCatalog" :key='product.id'>
            Product: {{ product.title }} - {{ product.price | asCurrency }} - Quantity In-Stock: {{ product.inventory }}
            <button :disabled="!product.inventory"
              @click="addToCart(product)">Add to Cart</button>
          </li>
        </ul>
        <hr>
        <h2>Shopping Cart</h2>
        <ul>
          <li v-for="cartedItem in shoppingCart" :key='cartedItem.id'>
            Product: {{ cartedItem.title }} - {{ cartedItem.price | asCurrency }} - {{ cartedItem.quantity }}
            <br/>
          </li>
        </ul>
        <h4>Total: {{ preTaxTotal | asCurrency }}</h4>
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
  
