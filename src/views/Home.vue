<template>
  <v-container>
    <Categories/>
    <RecommendedOffers/>
  </v-container>
</template>

<script>
import Categories from "@/components/Categories";
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

</style>