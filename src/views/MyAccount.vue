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
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import AccountMenu from '../components/account/AccountMenu.vue'
import AccountStatistics from '../components/account/AccountStatistics.vue';
import LatestOrders from '@/components/account/LatestOrders.vue';

@Component({
  components: { AccountMenu, AccountStatistics, LatestOrders }
})
export default class extends Vue {
}
</script>

<style scoped>
  .main {
    display: flex;
  }

  .account-menu {
    flex-grow: 0;
    border-radius: 5pt;
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.8)
    );
    backdrop-filter: blur(10px);
  }

  .account-statistics {
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.8)
    );
    flex-grow: 1;
    margin-left: 10pt;
    border-radius: 5pt;
    backdrop-filter: blur(10px);
  }

  .latest-orders {
    border-radius: 5pt;
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.8)
    );
    backdrop-filter: blur(10px);
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
