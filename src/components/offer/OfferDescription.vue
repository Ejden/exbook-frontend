<template>
  <v-card elevation="0">
    <v-card-title>{{ $t('offer.description.title') }}</v-card-title>

    <v-card-text>
      <div>{{ description }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    description: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
