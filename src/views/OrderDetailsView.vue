<template>
  <v-container v-if="order" class="pt-0 pb-0">
    <v-container class="container-standard-background margin-top-16 rounded main-container" v-if="!!order">
      <div class="order-details">
        <div class="info-container">
          <div>
            <h4>{{ $t('orderDetailsPage.status') }} {{ getOrderStatus(order.status) }}</h4>
            <span>{{ $t('orderDetailsPage.seller') }} {{ sellerName }}</span>
          </div>

          <span>{{ orderDate }}</span>
        </div>

        <div class="offer-items">
          <order-details-offer-item
            v-for="item in order.items"
            :key="item.offerId"
            :item="item"
          />
        </div>

        <v-divider class="horizontal-section-divider"/>

        <order-details-summary-snippet
            :total-cost="order.totalCost"
            :shipping="order.shipping"
        />

        <v-divider v-if="showExchangeBooks" class="horizontal-section-divider"/>

        <order-details-exchange-books
            v-if="showExchangeBooks"
            :exchange-books="order.exchangeBooks"
        />

        <v-divider class="horizontal-section-divider"/>

        <order-details-info-section
            :shipping="order.shipping"
            :order="order"
        />
      </div>

      <v-divider vertical class="vertical-section-divider"/>

      <div class="order-actions">
        <order-details-actions
            :actions="order.availableActions.buyerActions"
            @changeStatusToDelivered="changeStatusToDeliveredEventHandler"
            @cancelOrder="cancelOrderEventHandler"
            @returnOrder="returnOrderEventHandler"
        />
      </div>
    </v-container>

    <v-container class="margin-top-16 container-standard-background mobile-actions">
      <order-details-actions
          :actions="order.availableActions.buyerActions"
          class="margin-top-16"
          @changeStatusToDelivered="changeStatusToDeliveredEventHandler"
          @cancelOrder="cancelOrderEventHandler"
          @returnOrder="returnOrderEventHandler"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { changeOrderStatus, getOrderSnippet, OrderStatus, OrderType, UserOrderSnippet } from '@/api/OrderApi';
import { getMonth, getOrderStatus } from '@/mixin';
import OrderDetailsOfferItem from '@/components/order-details/OrderDetailsOfferItem.vue';
import OrderDetailsSummarySnippet from '@/components/order-details/OrderDetailsSummarySnippet.vue';
import OrderDetailsInfoSection from '@/components/order-details/OrderDetailsInfoSection.vue';
import OrderDetailsActions from '@/components/order-details/OrderDetailsActions.vue';
import OrderDetailsExchangeBooks from '@/components/order-details/OrderDetailsExchangeBooks.vue';

export default defineComponent({
  components: {
    OrderDetailsExchangeBooks,
    OrderDetailsActions,
    OrderDetailsInfoSection,
    OrderDetailsSummarySnippet,
    OrderDetailsOfferItem
  },
  setup(_, { root }) {
    const order = ref<UserOrderSnippet | undefined>(undefined);
    const sellerName = computed(() => order.value?.seller.firstName + ' ' + order.value?.seller.lastName);
    const showExchangeBooks = computed(() => order.value?.orderType === OrderType.EXCHANGE);

    getOrderSnippet(root.$route.params.orderId)
      .then(response => order.value = response.data);

    const orderDate = computed(() => {
      let date = '';
      if (order.value === undefined) return '';
      const d = new Date(order.value.orderDate);
      date += d.getDate() + ' ';
      date += getMonth(d.getMonth() + 1) + ' ';
      date += d.getFullYear() + ' ';
      date += d.getHours() + ':';
      date += d.getMinutes();
      return date;
    });

    const changeStatusToDeliveredEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.DELIVERED)
          .then(response => order.value = response.data);
      }
    }

    const cancelOrderEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.CANCELED)
          .then(response => order.value = response.data);
      }
    }

    const returnOrderEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.RETURN_IN_PROGRESS)
          .then(response => order.value = response.data);
      }
    }

    return {
      order,
      getOrderStatus,
      sellerName,
      orderDate,
      showExchangeBooks,
      changeStatusToDeliveredEventHandler,
      cancelOrderEventHandler,
      returnOrderEventHandler
    }
  }
});
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.order-details {
  flex-grow: 1;
}

.order-actions {
  display: flex;
  flex-direction: column;
}

.info-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.offer-items {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 8px;
}

.horizontal-section-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}

.mobile-actions {
  display: none;
}

@media screen and (max-width: 900px) {
  .main-container {
    flex-direction: column;
  }

  .vertical-section-divider {
    display: none;
  }

  .mobile-actions {
    display: block;
  }

  .order-actions {
    display: none;
  }
}
</style>
