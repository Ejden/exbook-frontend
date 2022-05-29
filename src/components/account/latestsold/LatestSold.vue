<template>
  <div class="main">
    <v-subheader>{{ $t('myAccount.latestSold') }}</v-subheader>

    <v-divider/>

    <div class="content">
      <div v-if="thereAreNoOrders" class="empty-orders">
        <p class="no-orders-info">{{ $t('myAccount.noSoldOrders') }}</p>
      </div>

      <div v-else class="orders">
        <sold-order-snippet v-for="order in orders" :key="order.id" :order="order"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { getLatestSoldOrdersSnippets, UserOrderSnippet } from '@/api/OrderApi';
import SoldOrderSnippet from '@/components/account/latestsold/SoldOrderSnippet.vue';

export default defineComponent({
  components: {
    SoldOrderSnippet

  },
  setup() {
    const orders = ref<UserOrderSnippet[]>([]);
    const thereAreNoOrders = computed(() => orders.value.length === 0);

    getLatestSoldOrdersSnippets(1, 3)
      .then(response => orders.value = response.data.content);

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
