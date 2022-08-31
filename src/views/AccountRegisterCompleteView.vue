<template>
  <v-container class="fill-height">
    <v-card
        class="mx-auto"
        max-width="500"
        min-width="20%"
        elevation="0"
    >
      <v-card-title>{{ $t('registerCompleteView.title') }}</v-card-title>

      <v-card-text class="info-text">
        <span>{{ $t('registerCompleteView.firstParagraph') }}</span>
        <span>{{ $t('registerCompleteView.secondParagraph') }}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({});
</script>

<style scoped>
.info-text {
  display: flex;
  flex-direction: column;
}
</style>
