<template>
  <v-card>
    <v-card-title>Informacje o sprzedającym</v-card-title>

    <v-card-text class="self-container">
      <span class="id">Id użytkownika: {{ id }}</span>
      <span class="username">Nazwa użytkownika: {{ username }}</span>
      <span class="grade">Ocena użytkownika: {{ grade }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SellerInfo",
  props: ['username', 'grade', 'firstName', 'lastName', 'id']
}
</script>

<style scoped>
  .self-container {
    display: flex;
    flex-direction: column;
  }
  .grade {

  }
</style>