<template>
  <v-container class="body mt-10">
    <h1>{{ $t('errorPage.title') }}</h1>
    <span>{{ $t('errorPage.description') }}</span>
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
