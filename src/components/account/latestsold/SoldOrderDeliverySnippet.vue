<template>
  <div class="main">
    <span>{{ shipping.methodName }}</span>
    <span>{{ shipping.cost.finalCost.amount }} {{ shipping.cost.finalCost.currency}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Shipping } from '@/api/OrderApi';

export default defineComponent({
  props: {
    shipping: {
      type: Object as PropType<Shipping>,
      required: true
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
}
</style>
