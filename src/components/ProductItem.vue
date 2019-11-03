<template>
    <div class="app">
        <div class="product">
            <div class="product-image">
                <img :src="image" />
            </div>
          <div class="product-info">
              <h1>{{ productTitle }} <small v-if="onSale">ON SALE</small></h1>
              <p><strong>{{ priceFormat(price) }} €</strong> <del v-if="initialPrice">from {{ priceFormat(initialPrice) }} €</del></p>
              <p>{{ inStock ? 'InStock' : 'OutOfStock' }}</p>
              <p>Shipping: {{ premium ? 'Free' : '2.99 €' }}</p>
              <!-- <product-detail v-for="detail in details" :key="detail">{{ detail }}</product-detail> -->
              <product-details
                  v-for="detail in details"
                  :detail="detail"
                  :key="detail">
              </product-details>

              <ul class="list-unstyled">
                  <li class="variant" v-for="(variant, index) in variants" :key="variant.variantId">
                      <div class="color"
                          @click="updateProduct($event, index)"
                          :style="{ backgroundColor: variant.variantColor }"
                          :class="[variant.variantColor, index == selectedVariantIdx ? 'active' : '', { 'hasStock': inStock }]"
                          :title="variant.variantColor">
                      </div>
                      <!-- <div v-for="size in variant.sizes" :key="size"
                        class="size"
                        :class="{'sale': onSale}"
                        >{{ size }}</div> -->
                  </li>
              </ul>
              <label>Size: </label>
              <select name="">
                  <option v-for="size in sizes" :key="size" :value="size.value">{{ size }}</option>
              </select>
          </div>
        </div>

        <button
            type="button"
            v-on:click="addToCart"
            :class="{'disabled': !inStock}"
            :disabled="!inStock">
          Add to cart
        </button>
        <button
        class="btn-remove"
            type="button"
            v-on:click="removeFromCart"
            :style="{ display: inCart ? 'inline-block' : 'none' }"
            :disabled="!inCart">
          Remove from cart
        </button>
    </div>
</template>

<script>
import ProductDetails from "./ProductDetails";
import { mixin } from "../mixins.js";

export default {
    name: 'product-item',
    components: {
        ProductDetails
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        brand: {
            type: String
        },
        price: {
            type: Number,
            required: true,
            default: 0.01
        },
        initialPrice: {
            type: Number
        },
        premium: {
            type: Boolean
        },
        details: {
            type: Object
        },
        inCart: { type: Boolean, default: false }
    },
    data () {
        return {
            selectedVariantIdx: 0,
            variants: [{
                variantId: 1,
                variantColor: 'green',
                variantImage: require('../assets/img-1.jpg'),
                variantQty: 10,
                variantSize: ["Small","Medium","Large"]
            }, {
                variantId: 2,
                variantColor: 'blue',
                variantImage: 'https://via.placeholder.com/300/0000FF/1C02AD?text=BLUE',//require('../assets/img-2.jpg'),
                variantQty: 10,
                variantSize: ["Medium","Large"]
            }]
        }
    },
    mixins: [mixin],
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.selectedVariant.variantId, this.price);
            this.checkCart();
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.selectedVariant.variantId, this.price, 'remove');
            this.inCart = false;
        },
        updateProduct: function($event, index) {
            const _el = document.querySelector('.color.active');

            _el && _el.classList.remove('active');
            $event.currentTarget.classList.add('active');
            this.selectedVariantIdx = index;
            this.checkCart();
        },
        checkCart: function() {
            const _p = this.$parent;

            this.inCart = (_p.getCartSize() === 0) ? false : _p.cart.hasOwnProperty(this.selectedVariant.variantId);
        }
    },
    computed: {
        productTitle() { return this.brand + ' ' + this.title },
        selectedVariant() { return this.variants[this.selectedVariantIdx] },
        image () { return this.selectedVariant.variantImage },
        sizes () { return this.selectedVariant.variantSize },
        inStock () { return this.selectedVariantvariantQty > 0 },
        onSale () { return this.initialPrice && this.initialPrice > this.price },
    },
};
</script>

<style scoped>
.btn-remove{background:#f00}
</style>
