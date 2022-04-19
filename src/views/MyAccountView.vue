<template>
  <div>
    <v-container class="main">
      <account-menu class="account-menu"/>

      <account-statistics class="account-statistics"/>
    </v-container>

    <v-container>
      <latest-orders class="latest-orders"></latest-orders>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import AccountMenu from '../components/account/AccountMenu.vue'
import AccountStatistics from '../components/account/AccountStatistics.vue';
import LatestOrders from '@/components/account/LatestOrders.vue';

export default defineComponent({
  components: {
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

  .latest-orders {
    border-radius: 5pt;
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
  }
</style>
