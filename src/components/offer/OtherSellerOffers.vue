<template>
  <v-card>
    <v-card-title>Inne oferty użytkownika</v-card-title>

    <v-card-text v-if="offers.length === 0">
      Ten użytkownik nie posiada więcej ofert
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "OtherSellerOffers",
  props: ['offers']
}
</script>

<style scoped>

</style>