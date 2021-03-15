<template>
  <v-card>
    <div class="category-toolbar d-flex">
        <v-container v-if="!isSelectedCategoriesEmpty" fluid class="d-flex align-content-space-around flex-wrap align-center">
          <v-chip
              v-for="category in selectedCategories" :key="category.id"
              close
              small
              close-icon="mdi-close-outline"
              class="ma-1"
          >
            <span>{{ category.name }}</span>
          </v-chip>
        </v-container>

        <v-container v-else class="d-flex align-center no-category-selected-info">
            <span>Nie wybrano żadnej kategorii</span>
        </v-container>
    </div>

    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
              dense
              v-model="selectedCategories"
              :items="categories"
              selection-type="leaf"
              selectable
              selected-color="indigo"
              open-all
              return-object
              @input="modifiedSelectedCategoriesEventHandler"
          ></v-treeview>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesSelectableList",
  data: () => ({
    selectedCategories: [],
    categories: []
  }),
  computed: {
    isSelectedCategoriesEmpty() {
      return this.selectedCategories.length === 0
    },
    selectedTreeCategories() {
      return this.selectedCategories
    }
  },
  methods: {
    addChildren(categories, parent) {
      for (let i = 0; i < categories.length; i++) {
        categories[i].children = categories[i].subcategories
        categories[i].parent = parent
        delete categories[i].subcategories

        if (categories[i].children.length > 0) {
          this.addChildren(categories[i].children, categories[i])
        }
      }
    },
    modifiedSelectedCategoriesEventHandler() {
      this.$emit('modifiedSelectedCategoriesEvent', this.selectedCategories)
    }
  },
  mounted() {
    axios.get('api/v1/categories').then((response) => {
      this.addChildren(response.data, null)
      this.categories = response.data
    }).catch(() => console.log('error'))
  }
}
</script>

<style scoped>
  .category-toolbar {
    background-color: #488fef;
    color: white;
    min-height: 50pt;
    border-radius: 0 0 5pt 5pt;
  }

  .no-category-selected-info {
    font-size: 12pt;
  }
</style>