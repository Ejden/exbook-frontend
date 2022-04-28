<template>
  <div class="main">
    <v-container v-if="thereAreNoOrders" class="no-orders-container">
      <span>{{ $t('myOrdersPage.noOrders') }}</span>
    </v-container>

    <div v-else class="orders-container">
      <v-container>
        <v-pagination
            v-model="page"
            :length="totalPages"
        />
      </v-container>

      <v-container
          v-for="order in orders"
          :key="order.id"
      >
        <sold-order-snippet
            :order="order"
        />
      </v-container>

      <v-container>
        <v-pagination
            v-model="page"
            :length="totalPages"
        />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import SoldOrderSnippet from "@/components/sold-orders/SoldOrderSnippet.vue";
import { computed, defineComponent, ref } from '@vue/composition-api';
import { getLatestSoldOrdersSnippets, UserOrderSnippet } from '@/api/OrderApi';

export default defineComponent({
  components: {
    SoldOrderSnippet
  },
  setup() {
    const orders = ref<UserOrderSnippet[]>([]);
    const thereAreNoOrders = computed(() => orders.value.length === 0);
    const page = ref(1);
    const totalPages = ref(1);

    getLatestSoldOrdersSnippets(page.value, 10)
        .then(response => {
          totalPages.value = response.data.totalPages;
          orders.value = response.data.content
        });

    return {
      orders,
      thereAreNoOrders,
      page,
      totalPages
    }
  }
});
</script>

<style scoped>
.main {
  height: 100%;
  margin: auto;
}

.no-orders-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.orders-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1000px;
}
</style>
