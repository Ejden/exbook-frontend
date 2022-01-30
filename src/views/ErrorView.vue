<template>
  <v-container class="body mt-10">
    <h1>Oh no...</h1>
    <span>Wygląda na to, że wystąpił nieoczekiwany błąd. Spróbuj ponownie później.</span>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
})
</script>

<style scoped>
  .body {
    text-align: center;
  }

  h1 {
    color: crimson;
  }
</style>
