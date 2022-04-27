<template>
  <v-card
      class="main"
      elevation="0"
  >
    <v-card-title class="order-title">
      <span>{{ $t('myAccount.status') }}: {{ getOrderStatus() }}</span>
      <span class="seller">
        {{ $t('myAccount.buyer') }}: {{ order.buyer.firstName + ' ' + order.buyer.lastName }}
      </span>
    </v-card-title>

    <v-card-text>
      <div class="items">
        <sold-order-item-snippet
            class="order-item-snippet"
            v-for="orderItem in order.items.slice(0, 3)"
            :key="orderItem.offerId"
            :order-item="orderItem"
        />
        <span v-if="order.items.length > 3">I więcej...</span>
      </div>

      <v-divider class="divider"/>

      <sold-order-delivery-snippet class="order-delivery-snippet" :shipping="order.shipping"/>

      <sold-order-snippet-summary :total-cost="order.totalCost"/>

      <div class="actions-container">
        <v-btn
            text
            color="primary"
            class="details-button"
            @click="goToOrderDetails"
        >
          {{ $t('myAccount.orderDetails') }}
        </v-btn>
      </div>
    </v-card-text>
    <v-divider/>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { OrderStatus, UserOrderSnippet } from '@/api/OrderApi';
import { i18n } from '@/main';
import SoldOrderItemSnippet from '@/components/account/latestsold/SoldOrderItemSnippet.vue';
import SoldOrderDeliverySnippet from '@/components/account/latestsold/SoldOrderDeliverySnippet.vue';
import SoldOrderSnippetSummary from '@/components/account/latestsold/SoldOrderSnippetSummary.vue';
import router from '@/router';

export default defineComponent({
  components: {
    SoldOrderSnippetSummary,
    SoldOrderDeliverySnippet,
    SoldOrderItemSnippet
  },
  props: {
    order: {
      type: Object as PropType<UserOrderSnippet>,
      required: true
    }
  },
  setup(props) {
    const getOrderStatus = () => {
      switch (props.order.status) {
        case OrderStatus.NEW:
          return i18n.t('myAccount.orderStatus.new')
        case OrderStatus.DECLINED:
          return i18n.t('myAccount.orderStatus.declined')
        case OrderStatus.ACCEPTED:
          return i18n.t('myAccount.orderStatus.accepted')
        case OrderStatus.RETURNED:
          return i18n.t('myAccount.orderStatus.returned')
        case OrderStatus.WAITING_FOR_ACCEPT:
          return i18n.t('myAccount.orderStatus.waitingForAccept')
        default:
          return i18n.t('myAccount.orderStatus.unknown')
      }
    }
    const goToOrderDetails = () => {
      router.push({ name: 'SoldOrderDetails', params: { orderId: props.order.id } })
    }

    return {
      getOrderStatus,
      goToOrderDetails
    }
  }
});
</script>

<style scoped>
.order-title {
  font-size: 12pt;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
}

.divider {
  margin-top: 10pt;
  margin-bottom: 10pt;
}

.seller {
  font-weight: normal;
  font-size: 11pt;
}

.items {
  display: flex;
  flex-direction: column;
  row-gap: 10pt;
}

.actions-container {
  display: flex;
}

.details-button {
  margin: auto;
}
</style>
