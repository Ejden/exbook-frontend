<template>
  <div class="categories glass rounded">
    <v-subheader>Kategorie</v-subheader>
    <v-divider/>
    <v-list
        dense
        color="transparent"
    >
      <v-list-item-group color="transparent">
        <Category
          v-for="category in categories"
          :key="category.id"
          :id="category.id"
          :name="category.name"
        />
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
import { categoryComparator } from "@/mixin/categoryComparator";
import Category from "@/components/category/Category";
import {CategoryClient} from "@/api/CategoryApi";

export default {
  name: "Categories",
  components: {Category},
  data() {
    return {
      categories: [],
      categoryApi: new CategoryClient()
    }
  },
  methods: {
    goToCategory: () => {
      console.log('Hi')
    }
  },
  mounted() {
    axios.get('api/categories').then((response) => {
      this.categories = response.data.filter(category => category.parentId === null).sort(categoryComparator)
    }).catch(() => console.log('error getting categories'))
  }
}
</script>

<style scoped>
  .categories {
  }
</style>