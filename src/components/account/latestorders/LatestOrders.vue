<template>
  <div class="main">
    <v-subheader>{{ $t('myAccount.latestOrders') }}</v-subheader>

    <v-divider/>

    <div class="content">
      <div v-if="thereAreNoOrders" class="empty-orders">
        <p class="no-orders-info">{{ $t('myAccount.emptyHere') }}<br>{{ $t('myAccount.checkoutOtherOffers') }}</p>
      </div>

      <div v-else class="orders">
        <order-snippet v-for="order in orders" :key="order.id" :order="order"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import OrderSnippet from '@/components/account/latestorders/OrderSnippet.vue';
import { getLatestOrdersSnippets, UserOrderSnippet } from '@/api/OrderApi';

export default defineComponent({
  components: {
    OrderSnippet
  },
  setup() {
    const orders = ref<UserOrderSnippet[]>([]);
    const thereAreNoOrders = computed(() => orders.value.length === 0);

    getLatestOrdersSnippets(1, 3)
        .then(response => orders.value = response.content);

    return {
      orders,
      thereAreNoOrders
    }
  }
});
</script>

<style scoped>
.main {
  background: white;
  display: flex;
  flex-direction: column;
}

.empty-orders {
  margin: auto;
}

.content {
  padding: 10pt;
}

.no-orders-info {
  text-align: center;
}
</style>
