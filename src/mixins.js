export const mixin = {
  methods: {
    priceFormat: function (price) {
      return Number.parseFloat(price).toFixed(2)
    }
  }
}
