<template>
  <v-container class="category-details">
    <span>Witaj w kategorii {{ categoryName }}</span>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(_, vm) {
    const categoryName = vm.root.$route.params.categoryName;

    return {
      categoryName
    }
  }
})
</script>

<style scoped>
  .category-details {
    background: white;
  }
</style>
