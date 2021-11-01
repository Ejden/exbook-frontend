<template>
  <div class="main">
    <span>Łącznie z dostawą</span>
    <span>{{ totalCost.amount }} {{ totalCost.currency }}</span>
  </div>
</template>

<script>
export default {
  name: "order-snippet-summary",
  props: ['totalCost']
}
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-between;
    font-weight: bolder;
  }
</style>