<template>
  <v-container v-if="!!order" class="pt-0 pb-0">
    <sold-order-details-address-dialog
        :show-dialog="showAddressDialog"
        @cancel="cancelExchangeEventHandler"
        @acceptExchangeWithAddress="acceptExchangeWithAddressEventHandler"
        @acceptExchangeWithPickupPoint="acceptExchangeWithPickupPointEventHandler"
    />
    <v-container class="container-standard-background margin-top-16 rounded main-container" v-if="!!order">
      <div class="order-details">
        <div class="info-container">
          <div>
            <h4>{{ $t('soldOrderDetailsPage.status') }} {{ getOrderStatus(order.status) }}</h4>
            <span>{{ $t('soldOrderDetailsPage.buyer') }} {{ buyerName }}</span>
          </div>

          <span>{{ orderDate }}</span>
        </div>

        <div class="offer-items">
          <sold-order-details-offer-item
              v-for="item in order.items"
              :key="item.offerId"
              :item="item"
          />
        </div>

        <v-divider class="horizontal-section-divider"/>

        <sold-order-details-summary-snippet
            :total-cost="order.totalCost"
            :shipping="order.shipping"
        />

        <v-divider v-if="showExchangeBooks" class="horizontal-section-divider"/>

        <sold-order-details-exchange-books
            v-if="showExchangeBooks"
            :exchange-books="order.exchangeBooks"
        />

        <v-divider class="horizontal-section-divider"/>

        <sold-order-details-info-section
            :shipping="order.shipping"
            :seller-shipping="order.sellerShippingInfo"
            :order="order"
        />
      </div>

      <v-divider vertical class="vertical-section-divider"/>

      <div class="order-actions">
        <sold-order-details-actions
            :order-type="order.orderType"
            :actions="order.availableActions.sellerActions"
            @acceptExchange="acceptExchangeEventHandler"
            @discardExchange="discardExchangeEventHandler"
            @markAsSent="markAsSentEventHandler"
            @confirmReturnDelivered="confirmReturnDeliveredEventHandler"
            @cancelOrder="cancelOrderEventHandler"
        />
      </div>
    </v-container>

    <v-container class="margin-top-16 container-standard-background mobile-actions">
      <sold-order-details-actions
          class="margin-top-16"
          :order-type="order.orderType"
          :actions="order.availableActions.sellerActions"
          @acceptExchange="acceptExchangeEventHandler"
          @discardExchange="discardExchangeEventHandler"
          @markAsSent="markAsSentEventHandler"
          @confirmReturnDelivered="confirmReturnDeliveredEventHandler"
          @cancelOrder="cancelOrderEventHandler"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import {
  acceptExchange,
  changeOrderStatus,
  getOrderSnippet,
  OrderStatus,
  OrderType,
  UserOrderSnippet
} from '@/api/OrderApi';
import { getMonth } from '@/mixin';
import { getOrderStatus } from '@/mixin';
import SoldOrderDetailsOfferItem from '@/components/sold-order-details/SoldOrderDetailsOfferItem.vue';
import SoldOrderDetailsSummarySnippet from '@/components/sold-order-details/SoldOrderDetailsSummarySnippet.vue';
import SoldOrderDetailsActions from '@/components/sold-order-details/SoldOrderDetailsActions.vue';
import SoldOrderDetailsInfoSection from '@/components/sold-order-details/SoldOrderDetailsInfoSection.vue';
import SoldOrderDetailsExchangeBooks from '@/components/sold-order-details/SoldOrderDetailsExchangeBooks.vue';
import SoldOrderDetailsAddressDialog from '@/components/sold-order-details/SoldOrderDetailsAddressDialog.vue';
import { ExchangeAddressEvent, ExchangePickupPointEvent } from '@/components/sold-order-details/@typings';

export default defineComponent({
  components: {
    SoldOrderDetailsAddressDialog,
    SoldOrderDetailsExchangeBooks,
    SoldOrderDetailsInfoSection,
    SoldOrderDetailsActions, SoldOrderDetailsSummarySnippet, SoldOrderDetailsOfferItem},
  setup(_, { root }) {
    const order = ref<UserOrderSnippet | undefined>(undefined);
    const buyerName = computed(() => order.value?.buyer.firstName + ' ' + order.value?.buyer.lastName);
    const showExchangeBooks = computed(() => order.value?.orderType === OrderType.EXCHANGE);
    const showAddressDialog = ref(false);

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

    const acceptExchangeEventHandler = () => {
      if (order.value !== undefined) {
        showAddressDialog.value = true;
      }
    };

    const acceptExchangeWithAddressEventHandler = (address: ExchangeAddressEvent) => {
      if (order.value !== undefined) {
        acceptExchange(order.value.id, { address })
            .then(() => location.reload());
      }
    };

    const acceptExchangeWithPickupPointEventHandler = (pickupPoint: ExchangePickupPointEvent) => {
      if (order.value !== undefined) {
        acceptExchange(order.value.id, { pickupPoint })
          .then(() => location.reload());
      }
    };

    const cancelExchangeEventHandler = () => {
      showAddressDialog.value = false;
    }

    const discardExchangeEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.DECLINED)
            .then(response => order.value = response.data);
      }
    }

    const markAsSentEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.SENT)
            .then(response => order.value = response.data);
      }
    }

    const confirmReturnDeliveredEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.RETURN_DELIVERED)
            .then(response => order.value = response.data);
      }
    }

    const cancelOrderEventHandler = () => {
      if (order.value !== undefined) {
        changeOrderStatus(order.value!.id, OrderStatus.CANCELED)
            .then(response => order.value = response.data);
      }
    }

    return {
      order,
      buyerName,
      orderDate,
      getOrderStatus,
      showExchangeBooks,
      showAddressDialog,
      acceptExchangeEventHandler,
      discardExchangeEventHandler,
      markAsSentEventHandler,
      confirmReturnDeliveredEventHandler,
      cancelOrderEventHandler,
      cancelExchangeEventHandler,
      acceptExchangeWithAddressEventHandler,
      acceptExchangeWithPickupPointEventHandler
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
