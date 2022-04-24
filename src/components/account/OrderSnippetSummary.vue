<template>
  <div class="main">
    <span>{{ $t('myAccount.summaryWithShipping') }}</span>
    <span>{{ totalCost.amount }} {{ totalCost.currency }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Money } from '@/api/OrderApi';

export default defineComponent({
  props: {
    totalCost: {
      type: Object as PropType<Money>,
      required: true
    }
  }
})
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: space-between;
    font-weight: bolder;
  }
</style>
