<template>
  <div class="glass rounded container">
    <div class="group-title">
      <h3>Sprzedawca: {{ draftOrder.seller.firstName }} {{ draftOrder.seller.lastName }}</h3>
      <h5>Rodzaj zamówienia: {{ orderTypeText }}</h5>
    </div>

    <div class="basket-items">
      <draft-order-item
          class="basket-item"
          v-for="item in draftOrder.items"
          :key="item.offer.id"
          :item="item"
      ></draft-order-item>
    </div>

    <v-divider class="margin-top-8 margin-bottom-8"/>

    <draft-order-group-summary
        :total-offers-price="draftOrder.totalOffersPrice"
    />

    <div v-if="showExchangeBooks">
      <v-divider class="margin-top-8 margin-bottom-8"/>

      <draft-order-exchange-books :exchange-books="draftOrder.exchangeBooks"/>
    </div>

    <v-divider class="margin-top-8 margin-bottom-8"/>

    <div>
      <draft-order-shipping
        :shipping-options="draftOrder.availableShippingMethods"
        @pickedShippingMethod="pickedShippingMethodEventHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { DraftPurchaseOrder } from '@/api/TransactionApi';
import DraftOrderItem from '@/components/transaction/DraftOrderItem.vue';
import DraftOrderGroupSummary from '@/components/transaction/DraftOrderGroupSummary.vue';
import DraftOrderExchangeBooks from '@/components/transaction/DraftOrderExchangeBooks.vue';
import { OrderType } from '@/api/CommonTypings';
import DraftOrderShipping from '@/components/transaction/DraftOrderShipping.vue';
import { PickedShippingMethodEvent } from '@/components/transaction/@types/PickedShippingMethodEvent';

export default defineComponent({
  components: {DraftOrderShipping, DraftOrderExchangeBooks, DraftOrderGroupSummary, DraftOrderItem},
  props: {
    draftOrder: {
      type: Object as PropType<DraftPurchaseOrder>,
      required: true
    }
  },
  setup(props, { emit }) {
    const showExchangeBooks = computed(() => props.draftOrder.orderType === OrderType.EXCHANGE);
    const orderTypeText = (props.draftOrder.orderType === OrderType.BUY) ? 'Kupno' : 'Wymiana';
    const pickedShippingMethodEventHandler = (shippingMethodId: string) => {
      emit('pickedShippingMethod', {
        shippingMethodId: shippingMethodId,
        orderId: props.draftOrder.orderId
      } as PickedShippingMethodEvent);
    }

    return {
      showExchangeBooks,
      orderTypeText,
      pickedShippingMethodEventHandler
    }
  }
});
</script>

<style scoped>
.group-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.basket-items {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 16px;
}
</style>
