<template>
  <v-container class="cont">
    <NewOfferCreatedInfo :offer-url="offerUrl"/>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import NewOfferCreatedInfo from '@/components/created-offer/NewOfferCreatedInfo.vue';

export default defineComponent({
  components: {NewOfferCreatedInfo},
  setup(_, { root }) {
    const offerUrl = root.$store.getters.homeUrl + '/offer/' + root.$route.params.offerId;

    return {
      offerUrl
    }
  }
})
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
