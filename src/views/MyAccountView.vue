<template>
  <div>
    <v-container class="main">
      <account-menu class="account-menu"/>

      <account-statistics class="account-statistics"/>
    </v-container>

    <v-container class="orders-section">
      <latest-orders class="latest-orders container-standard-background rounded"/>

      <latest-sold class="latest-sold container-standard-background rounded"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import AccountMenu from '../components/account/AccountMenu.vue'
import AccountStatistics from '../components/account/AccountStatistics.vue';
import LatestOrders from '@/components/account/latestorders/LatestOrders.vue';
import LatestSold from '@/components/account/latestsold/LatestSold.vue';

export default defineComponent({
  components: {
    LatestSold,
    AccountMenu,
    AccountStatistics,
    LatestOrders
  }
})
</script>

<style scoped>
.main {
  display: flex;
}

.account-menu {
  flex-grow: 0;
  border-radius: 5pt;
  background: #ffffff;
}

.account-statistics {
  flex-grow: 1;
  margin-left: 10pt;
  border-radius: 5pt;
  background-color: #ffffff;
}

.orders-section {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.latest-orders {
  border-radius: 5pt;
  flex-basis: 50%;
}

.latest-sold {
  flex-basis: 50%;
}

@media only screen and (max-width: 768px) {
  .main {
    flex-direction: column;
  }

  .account-statistics {
    border-radius: 5pt;
    margin-top: 20pt;
    margin-left: 0;
  }

  .orders-section {
    flex-direction: column;
  }
}
</style>
