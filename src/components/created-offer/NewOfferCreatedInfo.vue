<template>
  <v-card class="mx-auto">
    <v-card-title>
      Utworzyłeś nową ofertę
    </v-card-title>

    <v-card-text class="new-offer-info">
      <span>Niedługo twoja oferta powinna pojawić się w tym miejscu: <a :href="offerUrl">{{ offerUrl }}</a>.</span>
      <span>Jeśli masz ochotę możesz też dodać kolejną ofertę.</span>
    </v-card-text>

    <v-card-actions>
      <v-btn text to="/add-offer">
        <span>Dodaj nową ofertę</span>
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
