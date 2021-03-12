<template>
  <v-container class="main-container d-flex align-start wrap">
    <NewOfferForm class="new-offer-form"/>
    <v-card class="right-panel">
      <NewOfferTips class="new-offer-tips"/>
    </v-card>
  </v-container>
</template>

<script>
import NewOfferForm from "@/components/NewOffer/NewOfferForm";
import NewOfferTips from "@/components/NewOffer/NewOfferTips";
export default {
name: "NewOffer",
  components: {NewOfferTips, NewOfferForm}
}
</script>

<style scoped>
  .new-offer-form {
    width: 60%;
    margin-right: 10pt;
  }
  .new-offer-tips {
  }

  .right-panel {
    background-color: #eeeeee;
    max-width: 400px;
    width: 40%;
  }
</style>