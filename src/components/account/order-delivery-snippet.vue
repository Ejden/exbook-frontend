<template>
  <div class="main">
    <span>{{ shipping.methodName }}</span>
    <span>{{ shipping.cost.finalCost.amount }} {{ shipping.cost.finalCost.currency}}</span>
  </div>
</template>

<script>
export default {
  name: "order-delivery-snippet",
  props: ['shipping']
}
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-between;
  }
</style>