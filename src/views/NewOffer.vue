<template>
  <v-container class="main-container">
    <NewOfferForm class="new-offer-form"/>
    <v-card class="right-panel">
      <NewOfferTips v-on:createOffer="createOffer" class="new-offer-tips"/>
    </v-card>
  </v-container>
</template>

<script>
import NewOfferForm from "@/components/NewOffer/NewOfferForm";
import NewOfferTips from "@/components/NewOffer/NewOfferTips";

export default {
name: "NewOffer",
  components: {NewOfferTips, NewOfferForm},
  methods: {
    createOffer() {
      this.$store.dispatch('addOffer')
    }
  }
}
</script>

<style scoped>
  .main-container {
    display: flex;
    align-items: flex-start;
  }
  .new-offer-form {
    width: 60%;
    margin-right: 10pt;
  }
  .new-offer-tips {
    position: fixed;
  }

  .right-panel {
    background-color: #eeeeee;
    width: 40%;
  }

  @media only screen and (max-width: 768px){
    .main-container {
      flex-direction: column;
      width: 100%;
    }

    .new-offer-form {
      width: 100%;
    }

    .new-offer-tips {
      position: relative;
      width: 100%;
    }

    .right-panel {
      margin-top: 10pt;
      width: 100%;
    }
  }
</style>