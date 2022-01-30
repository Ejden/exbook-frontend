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
