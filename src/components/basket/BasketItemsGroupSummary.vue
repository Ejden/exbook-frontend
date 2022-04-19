<template>
  <div class="price-container">
    <h5 class="summary-price">Suma: {{ totalOffersPrice.amount }} {{ totalOffersPrice.currency }}</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Money } from '@/api/BasketApi';

export default defineComponent({
  props: {
    totalOffersPrice: {
      type: Object as PropType<Money>,
      required: true
    }
  }
});
</script>

<style scoped>
.price-container {
  text-align: right;
}
</style>
