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

<script>
export default {
  name: "NewOfferCreatedInfo",
  props: ['offerUrl']
}
</script>

<style scoped>
  .new-offer-info {
    display: flex;
    flex-direction: column;
  }
</style>