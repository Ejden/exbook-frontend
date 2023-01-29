<template>
  <div class="main">
    <div class="cost-container">
      <div class="cost">
        <span class="mr-2">{{ $t('basket.toPay') }}</span>
        <span class="totalOffersCost">{{ totalCost.amount }} {{ totalCost.currency }}</span>
      </div>
      <span>{{ $t('basket.plusShippingCost') }}</span>
    </div>

    <v-btn
        class="delivery-button"
        block
        large
        color="primary"
        elevation="0"
        :loading="loading"
        :disabled="!canGoToSummaryPage"
        @click="pickDeliveryEventHandler"
    >{{ $t('basket.pickShipping') }}</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Money } from '@/api/BasketApi'

export default defineComponent({
  props: {
    totalCost: {
      type: Object as PropType<Money>
    },
    loading: {
      type: Boolean
    },
    canGoToSummaryPage: {
      type: Boolean
    }
  },
  setup(_, { emit }) {
    const pickDeliveryEventHandler = () => {
      emit('pickDelivery');
    };

    return {
      pickDeliveryEventHandler
    }
  }
})
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
