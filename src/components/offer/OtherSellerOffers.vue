<template>
  <v-card elevation="0">
    <v-card-title>{{ $t('offer.recommendations.title') }}</v-card-title>

    <v-card-text v-if="offers.length === 0">
      {{ $t('offer.recommendations.noRecommendations') }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { DetailedOffer } from '@/api/ListingApi';

export default defineComponent({
  name: "OtherSellerOffers",
  props: {
    offers: {
      type: Array as PropType<Array<DetailedOffer>>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
