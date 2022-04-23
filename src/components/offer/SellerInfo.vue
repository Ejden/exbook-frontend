<template>
  <v-card elevation="0">
    <v-card-title>Informacje o sprzedającym</v-card-title>

    <v-card-text class="self-container">
      <span class="id">Id użytkownika: {{ seller.id }}</span>
      <span class="username">Nazwa użytkownika: {{ seller.username }}</span>
      <span class="grade">Ocena użytkownika: {{ seller.grade }}</span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Seller } from '@/api/ListingApi';

export default defineComponent({
  props: {
    seller: Object as PropType<Seller>
  }
})
</script>

<style scoped>
  .self-container {
    display: flex;
    flex-direction: column;
  }
  .grade {

  }
</style>
