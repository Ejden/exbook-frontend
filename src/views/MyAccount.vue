<template>
  <v-container class="main">
    <account-menu class="account-menu"/>

    <account-statistics class="account-statistics"/>
  </v-container>
</template>

<script>
import AccountMenu from '../components/account/AccountMenu'
import AccountStatistics from "../components/account/AccountStatistics";
export default {
  name: "MyAccount",
  components: {AccountStatistics, AccountMenu }
}
</script>

<style scoped>
  .main {
    display: flex;
  }

  .account-menu {
    flex-grow: 0;
  }

  .account-statistics {
    flex-grow: 1;
    margin-left: 10pt;
  }
</style>