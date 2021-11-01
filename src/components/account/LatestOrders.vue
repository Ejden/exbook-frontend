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

<script>
import axios from "axios";
import OrderSnippet from "@/components/account/OrderSnippet";

export default {
  name: "LatestOrders",
  components: {OrderSnippet},
  data: () => {
    return {
      orders: []
    }
  },
  computed: {
    thereAreNoOrders() {
      return this.orders.length === 0
    }
  },
  beforeMount() {
    let ordersUrl = 'api/orders/snippet'
    axios.get(ordersUrl).then(response => {
      this.orders = response.data.content
    })
  }
}
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