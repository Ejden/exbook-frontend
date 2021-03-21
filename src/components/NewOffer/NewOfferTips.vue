<template>
  <v-card>
    <v-card-text>
      <h1 class="mb-7">Wystaw ofertę</h1>

      <h3 class="mb-1">Porady</h3>
      <ul>
        <li>
          <span>Wpisanie numeru ISBN ułatwi znalezienie innym użytkownikom twojej oferty!</span>
        </li>
        <li>
          <span>Dodanie zdjęć książki powoduje większe zainteresowanie ofertą!</span>
        </li>
        <li>
          <span>W opisie możesz wpisać książki, które Cię najbardziej interesują do wymiany!</span>
        </li>
      </ul>

      <v-btn class="submit-button mt-7" @click="addOffer" block large color="primary">
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
      this.$store.dispatch('addOffer')
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