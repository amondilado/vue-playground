import Vue from 'vue'
// import wrap from '@vue/web-component-wrapper'
// import ProductItem from path
import App from './App.vue'

Vue.config.productionTip = false

// const Component = {
//     ProductItem
// };
// const customElement = wrap(Vue, Component);
// window.customElements.define('product-item', ProductItem);
/* eslint-disable no-new */
new Vue({
  render: h => h(App),
}).$mount('#app')
