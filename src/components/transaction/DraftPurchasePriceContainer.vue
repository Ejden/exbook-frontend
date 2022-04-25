<template>
  <div class="main">
    <div class="cost-container">
      <div class="cost">
        <span class="mr-2">{{ $t('basketTransaction.toPay') }}</span>
        <span class="totalOffersCost">{{ totalCost.amount }} {{ totalCost.currency }}</span>
      </div>
      <span v-if="isShippingInfoComplete && !isFreeDelivery">
        {{ $t('basketTransaction.includingShipping') }} {{ shippingCost.amount }} {{ shippingCost.currency }}
        {{ $t('basketTransaction.shippingPrice') }}
      </span>

      <span v-if="isFreeDelivery && isShippingInfoComplete">{{ $t('basketTransaction.freeShipping') }}</span>
      <span v-if="!isShippingInfoComplete">{{ $t('basketTransaction.plusShippingCost') }}</span>
    </div>

    <v-btn
        class="delivery-button"
        block
        large
        color="primary"
        elevation="0"
        :loading="loading"
        :disabled="!buttonEnabled"
        @click="makePurchaseEventHandler"
    >{{ $t('basketTransaction.confirmTransaction') }}</v-btn>
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
      required: true
    },
    loading: {
      type: Boolean,
      required :true
    },
    buttonEnabled: {
      type: Boolean,
      required: true
    },
    isShippingInfoComplete: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const makePurchaseEventHandler = () => {
      emit('makePurchase');
    };
    const isFreeDelivery = computed(() => props.isShippingInfoComplete && props.shippingCost.amount === 0);

    return {
      makePurchaseEventHandler,
      isFreeDelivery
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
