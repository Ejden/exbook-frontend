<template>
  <div v-if="!!order">
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
            :order="order"
        />
      </div>

      <v-divider vertical class="vertical-section-divider"/>

      <div class="order-actions">
        <sold-order-details-actions
            :order-type="order.orderType"
            :actions="order.availableActions.sellerActions"
        />
      </div>
    </v-container>

    <v-container class="margin-top-16 container-standard-background mobile-actions">
      <sold-order-details-actions
          class="margin-top-16"
          :order-type="order.orderType"
          :actions="order.availableActions.sellerActions"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { getOrderSnippet, OrderType, UserOrderSnippet } from '@/api/OrderApi';
import { getMonth } from '@/mixin';
import { getOrderStatus } from '@/mixin';
import SoldOrderDetailsOfferItem from '@/components/sold-order-details/SoldOrderDetailsOfferItem.vue';
import SoldOrderDetailsSummarySnippet from '@/components/sold-order-details/SoldOrderDetailsSummarySnippet.vue';
import SoldOrderDetailsActions from '@/components/sold-order-details/SoldOrderDetailsActions.vue';
import SoldOrderDetailsInfoSection from '@/components/sold-order-details/SoldOrderDetailsInfoSection.vue';
import SoldOrderDetailsExchangeBooks from '@/components/sold-order-details/SoldOrderDetailsExchangeBooks.vue';

export default defineComponent({
  components: {
    SoldOrderDetailsExchangeBooks,
    SoldOrderDetailsInfoSection,
    SoldOrderDetailsActions, SoldOrderDetailsSummarySnippet, SoldOrderDetailsOfferItem},
  setup(_, { root }) {
    const order = ref<UserOrderSnippet | undefined>(undefined);
    const buyerName = computed(() => order.value?.buyer.firstName + ' ' + order.value?.buyer.lastName);
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

    return {
      order,
      buyerName,
      orderDate,
      getOrderStatus,
      showExchangeBooks
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
