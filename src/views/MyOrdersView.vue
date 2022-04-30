<template>
  <div class="main">
    <div class="orders-container">
      <v-container class="filters-pagination-container">
        <v-pagination
            v-model="page"
            :length="totalPages"
        />

        <v-select
            class="status-select"
            :items="orderStatus"
            v-model="selectedStatusFilters"
            multiple
            outlined
            dense
            :placeholder="$t('myOrdersPage.status')"
            elevation="0"
        >
          <template #selection="{ item, index }">
            <span v-if="index === 0">{{ item.text }}</span>
            <span
                v-if="index === 1"
                class="ml-1 grey--text text-caption"
            >
              (+{{ ' ' + selectedStatusFilters.length - 1 }})
            </span>
          </template>
        </v-select>
      </v-container>

      <v-container v-if="thereAreNoOrders" class="no-orders-container">
        <span>{{ $t('myOrdersPage.noOrders') }}</span>
      </v-container>

      <v-container
          v-else
          v-for="order in orders"
          :key="order.id"
      >
        <my-order-snippet
            :order="order"
        />
      </v-container>

      <v-container v-if="!thereAreNoOrders">
        <v-pagination
            v-model="page"
            :length="totalPages"
        />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { getLatestOrdersSnippets, OrderStatus, UserOrderSnippet } from '@/api/OrderApi';
import MyOrderSnippet from '@/components/my-orders/MyOrderSnippet.vue';
import { MyOrderStatusOption } from '@/components/my-orders/@typings';
import { getOrderStatus } from '@/mixin';

export default defineComponent({
  components: {MyOrderSnippet},
  setup() {
    const orders = ref<UserOrderSnippet[]>([]);
    const thereAreNoOrders = computed(() => orders.value.length === 0);
    const page = ref(1);
    const totalPages = ref(1);
    const orderStatus = ref<MyOrderStatusOption[]>(orderStatusOptions());
    const selectedStatusFilters = ref<OrderStatus[]>([]);

    getLatestOrdersSnippets(page.value, 10)
      .then(response => {
        totalPages.value = response.totalPages;
        orders.value = response.content;
      });

    watch(page, async (newPage: number) => {
      getLatestOrdersSnippets(newPage, 10)
        .then(response => {
          totalPages.value = response.totalPages;
          orders.value = response.content;
        });
    });

    watch(selectedStatusFilters, (newStatus: OrderStatus[]) => {
      getLatestOrdersSnippets(page.value, 10, newStatus)
        .then(response => {
          totalPages.value = response.totalPages;
          orders.value = response.content;
        });
    });

    return {
      orders,
      thereAreNoOrders,
      page,
      totalPages,
      orderStatus,
      selectedStatusFilters
    }
  }
});

function orderStatusOptions(): MyOrderStatusOption[] {
  return [
    {
      text: getOrderStatus(OrderStatus.NEW),
      value: OrderStatus.NEW
    },
    {
      text: getOrderStatus(OrderStatus.WAITING_FOR_ACCEPT),
      value: OrderStatus.WAITING_FOR_ACCEPT
    },
    {
      text: getOrderStatus(OrderStatus.RETURNED),
      value: OrderStatus.RETURNED
    },
    {
      text: getOrderStatus(OrderStatus.ACCEPTED),
      value: OrderStatus.ACCEPTED
    },
    {
      text: getOrderStatus(OrderStatus.DECLINED),
      value: OrderStatus.DECLINED
    },
    {
      text: getOrderStatus(OrderStatus.CANCELED),
      value: OrderStatus.CANCELED
    },
    {
      text: getOrderStatus(OrderStatus.DELIVERED),
      value: OrderStatus.DELIVERED
    },
    {
      text: getOrderStatus(OrderStatus.SENT),
      value: OrderStatus.SENT
    }
  ]
}
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

.filters-pagination-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.status-select {
  max-width: 300px;
}
</style>
