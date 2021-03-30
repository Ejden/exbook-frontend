<template>
  <v-card>
    <v-card-title>Opis</v-card-title>

    <v-card-text>
      <div v-if="description.length > 0">
        {{ description }}
      </div>
      <div v-else>
        Brak opisu
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "OfferDescription",
  props: ['description']
}
</script>

<style scoped>

</style>