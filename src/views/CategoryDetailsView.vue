<template>
  <v-container class="category-details">
    <span>Witaj w kategorii {{ categoryName }}</span>
  </v-container>
</template>

<script>
export default {
  name: "CategoryDetails",
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    categoryName: function () {
      return this.$route.params.categoryName
    }
  }
}
</script>

<style scoped>
  .category-details {
    background: white;
  }
</style>