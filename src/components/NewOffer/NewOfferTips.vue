<template>
  <v-card class="d-flex column">
    <v-card-text>
      <div>
        <span>Wpisanie numeru ISBN ułatwi znalezienie innym użytkownikom twojej oferty!</span>
      </div>

      <div>
        <span>Dodanie zdjęć książki powoduje większe zainteresowanie ofertą!</span>
      </div>

      <v-btn class="submit-button" @click="addOffer">
        Dodaj ogłoszenie
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NewOfferTips",
  methods: {
    addOffer() {

    }
  }
}
</script>

<style scoped>
  template {
    background-color: white;
  }

  .submit-button {

  }
</style>