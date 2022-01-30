<template>
  <v-card class="main"
    color="transparent"
    elevation="0"
  >
    <v-card-title class="order-title">
      <span>Status: {{ getOrderStatus() }}</span>
      <span class="seller">Sprzedawca: {{ order.seller.firstName + ' ' + order.seller.lastName }}</span>
    </v-card-title>

    <v-card-text>
      <div class="items">
        <order-item-snippet
            class="order-item-snippet"
            v-for="orderItem in order.items"
            :key="orderItem.offerId"
            :order-item="orderItem"
        />
      </div>

      <v-divider class="divider"/>

      <order-delivery-snippet class="order-delivery-snippet" :shipping="order.shipping"/>

      <order-snippet-summary :total-cost="order.totalCost"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import OrderItemSnippet from "@/components/account/OrderItemSnippet.vue";
import OrderDeliverySnippet from "@/components/account/OrderDeliverySnippet.vue";
import OrderSnippetSummary from "@/components/account/OrderSnippetSummary.vue";
import { OrderStatus, UserOrderSnippet } from '@/api/OrderApi';

export default defineComponent({
  components: {
    OrderSnippetSummary,
    OrderDeliverySnippet,
    OrderItemSnippet
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
          return 'NOWE'
        case OrderStatus.DECLINED:
          return 'ODRZUCONE'
        case OrderStatus.ACCEPTED:
          return 'ZAAKCEPTOWANE'
        case OrderStatus.RETURNED:
          return 'ZWRÓCONE'
        default:
          return 'NIEZNANE'
      }
    }

    return {
      getOrderStatus
    }
  }
})
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
</style>
