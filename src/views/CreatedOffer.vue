<template>
  <v-container class="cont">
    <NewOfferCreatedInfo :offer-url="offerUrl"/>
  </v-container>
</template>

<script>
import NewOfferCreatedInfo from "@/components/createdOffer/NewOfferCreatedInfo";

export default {
  name: "CreatedOffer",
  components: {NewOfferCreatedInfo},
  data() {
    return {
      offerUrl:this.$store.getters.homeUrl + '/offer/' + this.$route.params.offerId
    }
  }
}
</script>

<style scoped>
  .cont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 400vw;
  }
</style>