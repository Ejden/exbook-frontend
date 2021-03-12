<template>
  <div
    class="category-card"
  >
    <v-layout
      justify-center
    >
      <img
        :src="categoryThumbnailUrl"
        alt="Category thumbnail"
        height="80"
        width="80"
        class="thumbnail"
      />
    </v-layout>
    <v-layout
      justify-center>
      <span>{{name}}</span>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Category",
  props: {
    id: String,
    name: String,
    svgImg: String
  },
  data() {
    return {

    }
  },
  computed: {
    categoryThumbnailUrl() {
      return axios.defaults.baseURL + 'api/v1/categories/' + this.id + '/thumbnail'
    }
  }
}
</script>

<style scoped>
  .category-card {
    width: 80pt;
    margin: 20pt 30pt 30pt 0;
  }
  .thumbnail {
  }
</style>