<template>
  <div id="app">
    <div class="cart">Cart {{ priceFormat(cartTotal) }} € ({{ getCartSize() }})</div>
    <product-item
        title="Sock"
        brand="Suga"
        price="10.24"
        initial-price="12.00"
        :details="details"
        :premium="premium"
        @add-to-cart="updateCart"
        @remove-from-cart="updateCart">
    </product-item>
  </div>
</template>

<script>
import ProductItem from './components/ProductItem.vue'
import { mixin } from "./mixins.js";

export default {
  name: 'app',
  components: {
    ProductItem
  },
  data() { return {
      premium: true,
      details: window["APP"] && window["APP"].details,
      cart: {},
      cartTotal: 0,
  }},
  mixins: [mixin],
  methods: {
      updateCart(id, price, action) {
          if(action && action === 'remove') {
            // update total
            this.cartTotal -= Number(price) * this.cart[id];
            // delete key
            delete this.cart[id];

          } else {
              !this.cart.hasOwnProperty(id) ? this.cart[id] = 1 : this.cart[id]++;
              this.cartTotal += Number(price);
          }
      },
      getCartSize() { return Object.keys(this.cart).length }
  },
  computed: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
button {
background-color: royalblue;
border: 0;
color: #fff;
font-weight:bold;
font-size: 1.2rem;
padding: .85em;
display:inline-block;
}
button:focus {
    background-color: dodgerblue;
}
button[disabled] {
    background-color: #e0e0e0;
    color: #999;
}
.list-unstyled {list-style:none;}
.list-inline li {display:inline-block; margin-right: 5px;}
.cart{border:1px solid #ccc;padding:1rem;margin-bottom:10px;text-align:right}
.product {display:flex;}
.product-info{padding:1rem}
.variant {margin-bottom: 10px;}
.color {width: 40px;height:40px;}
.color.active {box-shadow: inset 0 0 0 3px rgba(0,0,0,.5)}
.size {font-size:85%}
</style>
