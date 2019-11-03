<template>
    <div class="product-detail">
        <div class="title">{{ detail.title }}</div>
        <div class="data">{{ detail.data }}</div>
    </div>
</template>

<script>
export default {
    name: 'product-details',
    props: {
        detail: {
            type: Object
        }
    }
}
</script>

<style lang="css" scoped>
.product-detail{margin-bottom:10px;}
</style>
