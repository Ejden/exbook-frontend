<template>
  <div>
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

        <v-divider class="horizontal-section-divider"/>

        <order-details-info-section
            :shipping="order.shipping"
            :order="order"
        />
      </div>

      <v-divider vertical class="vertical-section-divider"/>

      <div class="order-actions">
        <order-details-actions/>
      </div>
    </v-container>

    <v-container class="margin-top-16 container-standard-background mobile-actions">
      <order-details-actions class="margin-top-16"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { getOrderSnippet, UserOrderSnippet } from '@/api/OrderApi';
import { getMonth, getOrderStatus } from '@/mixin';
import OrderDetailsOfferItem from '@/components/order-details/OrderDetailsOfferItem.vue';
import OrderDetailsSummarySnippet from '@/components/order-details/OrderDetailsSummarySnippet.vue';
import OrderDetailsInfoSection from '@/components/order-details/OrderDetailsInfoSection.vue';
import OrderDetailsActions from '@/components/order-details/OrderDetailsActions.vue';

export default defineComponent({
  components: {
    OrderDetailsActions,
    OrderDetailsInfoSection,
    OrderDetailsSummarySnippet,
    OrderDetailsOfferItem
  },
  setup(_, { root }) {
    const order = ref<UserOrderSnippet | undefined>(undefined);
    const sellerName = computed(() => order.value?.seller.firstName + ' ' + order.value?.seller.lastName);

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
      getOrderStatus,
      sellerName,
      orderDate
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
