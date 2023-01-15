<template>
  <div class="main">
    <v-btn
        v-if="showExchangeButtons"
        class="button"
        elevation="0"
        text
        color="primary"
        large
        :disabled="!actions.canExchangeBeAccepted"
        @click="acceptExchange"
    >
      {{ $t('soldOrderDetailsPage.action.accept') }}
    </v-btn>

    <v-btn
        v-if="showExchangeButtons"
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
        :disabled="!actions.canExchangeBeDismissed"
        @click="discardExchange"
    >
      {{ $t('soldOrderDetailsPage.action.discard') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
        :disabled="!actions.canBeMarkedAsSent"
        @click="markAsSent"
    >
      {{ $t('soldOrderDetailsPage.action.sent') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
        :disabled="!actions.canBeMarkedAsReturnDelivered"
        @click="confirmReturnDelivered"
    >
      {{ $t('soldOrderDetailsPage.action.returnDelivered') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
        :disabled="!actions.canBeCancelled"
        @click="cancelOrder"
    >
      {{ $t('soldOrderDetailsPage.action.cancel') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { OrderType, SellerActions } from '@/api/OrderApi';

export default defineComponent({
  props: {
    actions: {
      type: Object as PropType<SellerActions>,
      required: true
    },
    orderType: {
      type: String as PropType<OrderType>,
      required: false
    }
  },
  setup(props, { emit }) {
    const showExchangeButtons = props.orderType == OrderType.EXCHANGE;

    const acceptExchange = () => {
      emit('acceptExchange');
    }

    const discardExchange = () => {
      emit('discardExchange');
    }

    const markAsSent = () => {
      emit('markAsSent');
    }

    const confirmReturnDelivered = () => {
      emit('confirmReturnDelivered');
    }

    const cancelOrder = () => {
      emit('cancelOrder');
    }

    return {
      showExchangeButtons,
      acceptExchange,
      discardExchange,
      markAsSent,
      confirmReturnDelivered,
      cancelOrder
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.button:before {
  background: transparent;
}

@media screen and (max-width: 900px) {
  .main {
    align-items: center;
  }
}
</style>
