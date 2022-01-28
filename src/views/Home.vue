<template>
  <v-container>
    <div class="home">
      <categories/>

      <recommended-offers class="ml-4 recommendations"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from "vue-property-decorator";
import Categories from "@/components/category/Categories.vue";
import RecommendedOffers from "@/components/home/RecommendedOffers.vue";

@Component({
  components: { RecommendedOffers, Categories }
})
export default class extends Vue {

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
