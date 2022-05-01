<template>
  <div class="recommended-offers glass rounded">
    <v-subheader>{{ $t('home.recommendedOffers') }}</v-subheader>
    <v-divider/>

    <div class="offers">
      <recommended-offer
          v-for="offer in offers"
          :key="offer.id"
          :offer="offer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getGeneralRecommendations, OfferRecommendation } from '@/api/OfferRecommendationsApi';
import RecommendedOffer from '@/components/home/RecommendedOffer.vue';

export default defineComponent({
  components: {RecommendedOffer},
  setup() {
    const offers = ref<OfferRecommendation[]>();

    getGeneralRecommendations()
      .then(response => offers.value = response.data.recommendations);

    return {
      offers
    }
  }
})
</script>

<style scoped>
.offers {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
}
</style>
