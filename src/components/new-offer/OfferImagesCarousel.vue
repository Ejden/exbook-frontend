<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(_, index) in images"
      :key="index"
    >

    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    images: {
      required: true
    }
  }
})
</script>

<style scoped>

</style>
