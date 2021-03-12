<template>
  <v-container>
    <v-layout justify-center>
      <h3>Kategorie</h3>
    </v-layout>
    <v-layout
      justify-start
    >
      <Category v-for="category in categories" :key="category.name" :name="category.name" :svg-img="category.svgImg" :id="category.id"></Category>
    </v-layout>
  </v-container>
</template>

<script>
import Category from "@/components/Category";
import axios from "axios";

export default {
  name: "Categories",
  components: {Category},
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    axios.get('api/v1/categories').then((response) => {
      this.categories = response.data
    }).catch(() => console.log('error'))

  }

}
</script>

<style scoped>

</style>