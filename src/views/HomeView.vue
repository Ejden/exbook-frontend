<template>
  <v-container>
    <div class="home">
      <categories/>

      <recommended-offers class="ml-4 recommendations"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Categories from '@/components/category/CategoryList.vue';
import RecommendedOffers from '@/components/home/RecommendedOffers.vue';

export default defineComponent({
  components: {
    Categories,
    RecommendedOffers
  }
})
</script>

<style scoped>
  .home {
    display: flex;
  }

  .recommendations {
    flex-grow: 1;
  }
</style>
