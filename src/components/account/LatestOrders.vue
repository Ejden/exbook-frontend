<template>
  <div class="main">
    <v-subheader>Ostatnie zamówienia</v-subheader>

    <v-divider/>

    <div class="content">
      <div v-if="thereAreNoOrders" class="empty-orders">
        <p class="no-orders-info">Pusto tu...<br>Sprawdź polecane oferty i znajdź coś dla siebie!</p>
      </div>

      <div v-else class="orders">
        <order-snippet v-for="order in orders" :key="order.id" :order="order"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import OrderSnippet from '@/components/account/OrderSnippet.vue';
import { getLatestOrdersSnippets, UserOrderSnippet } from '@/api/OrderApi';

export default defineComponent({
  components: {
    OrderSnippet
  },
  setup() {
    const orders = ref<UserOrderSnippet[]>([]);
    const thereAreNoOrders = computed(() => orders.value.length === 0);

    getLatestOrdersSnippets()
        .then(response => orders.value = response.content);

    return {
      orders,
      thereAreNoOrders
    }
  }
})
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

  .orders {

  }

  .content {
    padding: 10pt;
  }

  .no-orders-info {
    text-align: center;
  }
</style>
