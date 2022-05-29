<template>
  <v-container>
    <div class="home">
      <categories class="categories"/>

      <recommended-offers class="recommendations"/>
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
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.categories {
  flex-basis: 10%;
}

.recommendations {
  flex-basis: 90%;
  max-width: 90%;
}

@media screen and (max-width: 768px) {
  .home {
    flex-direction: column-reverse;
  }

  .categories {
    flex-basis: 100%;
  }

  .recommendations {
    flex-basis: 100%;
    max-width: 100%;
  }
}
</style>
