<template>
  <v-card class="mx-auto">
    <v-card-title>
      {{ $t('newOfferForm.offerCreated.title') }}
    </v-card-title>

    <v-card-text class="new-offer-info">
      <span>{{ $t('newOfferForm.offerCreated.offerLinkDescription') }} <a :href="offerUrl">{{ offerUrl }}</a>.</span>
      <span>{{ $t('newOfferForm.offerCreated.addNewOfferDescription') }}</span>
    </v-card-text>

    <v-card-actions>
      <v-btn text to="/add-offer">
        <span>{{ $t('newOfferForm.offerCreated.addNewOffer') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    offerUrl: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
  .new-offer-info {
    display: flex;
    flex-direction: column;
  }
</style>
