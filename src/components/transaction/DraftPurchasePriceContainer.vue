<template>
  <div class="main">
    <div class="cost-container">
      <div class="cost">
        <span class="mr-2">Do zapłaty:</span>
        <span class="totalOffersCost">{{ totalCost.amount }} {{ totalCost.currency }}</span>
      </div>
      <span v-if="shippingPriceMissing">+ koszty dostawy</span>
      <span v-else>w tym: {{ shippingCost.amount }} {{ shippingCost.currency }} kosztów dostawy</span>
    </div>

    <v-btn
        class="delivery-button"
        block
        large
        color="primary"
        elevation="0"
        :loading="loading"
        @click="makePurchaseEventHandler"
    >POTWIERDŹ ZAKUP</v-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { Money } from '@/api/CommonTypings';

export default defineComponent({
  props: {
    totalCost: {
      type: Object as PropType<Money>,
      required: true
    },
    totalOffersCost: {
      type: Object as PropType<Money>,
      required: true
    },
    shippingCost: {
      type: Object as PropType<Money>,
      required: false
    },
    loading: {
      type: Boolean,
      required :true
    },
    buttonEnabled: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const shippingPriceMissing = () => computed(() => props.shippingCost === undefined);

    const makePurchaseEventHandler = () => {
      emit('makePurchase');
    };

    return {
      makePurchaseEventHandler,
      shippingPriceMissing
    }
  }
});
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
