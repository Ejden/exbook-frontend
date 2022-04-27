<template>
  <div class="main">
    <div class="price-row">
      <span>{{ shipping.methodName }}</span>
      <span> {{ shipping.cost.finalCost.amount }} {{ shipping.cost.finalCost.currency}}</span>
    </div>

    <div class="price-row">
      <span style="font-weight: 500">{{ $t('orderDetailsPage.summaryWithShipping') }}</span>
      <span style="font-weight: 500"> {{ totalCost.amount }} {{ totalCost.currency }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Money, Shipping } from '@/api/OrderApi';

export default defineComponent({
  props: {
    shipping: {
      type: Object as PropType<Shipping>,
      required: true
    },
    totalCost: {
      type: Object as PropType<Money>,
      required: true
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-row {
  display: flex;
  justify-content: space-between;
}
</style>
