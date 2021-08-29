<template>
  <v-container>
    <div class="home">
      <categories/>

      <recommended-offers class="ml-4 recommendations"/>
    </div>
  </v-container>
</template>

<script>
import Categories from "@/components/category/Categories";
import RecommendedOffers from "@/components/home/RecommendedOffers";
export default {
  name: "Home",
  data() {
    return {

    }
  },
  components: {
    RecommendedOffers,
    Categories
  }
}
</script>

<style scoped>
  .home {
    display: flex;
  }

  .recommendations {
    flex-grow: 1;
  }
</style>