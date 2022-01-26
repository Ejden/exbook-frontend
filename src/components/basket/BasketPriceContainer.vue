<template>
  <div class="main">
    <div class="cost-container">
      <div class="cost">
        <span class="mr-2">Do zapłaty:</span>
        <span class="totalOffersCost">{{ totalCost.amount }} {{ totalCost.currency }}</span>
      </div>
      <span>+ koszty dostawy</span>
    </div>

    <v-btn
        class="delivery-button"
        block
        outlined
        large
        color="primary"
        elevation="0"
    >WYBÓR DOSTAWY</v-btn>
  </div>
</template>

<script>
export default {
  name: "BasketPriceContainer",
  props: ['totalCost']
}
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
  }

  .cost-container {
    width: 100%;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .totalOffersCost {
    font-size: 20pt;
    font-weight: 500;
  }

  .cost {
    display: flex;
    align-items: center;
  }

  .delivery-button {
    align-self: flex-end;
    margin-top: 20pt;
  }
</style>