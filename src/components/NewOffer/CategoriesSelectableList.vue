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
    modifiedSelectedCategoriesEventHandler() {
      console.log(this.selectedTreeCategories[0])
      this.$emit('modifiedSelectedCategoriesEvent', this.selectedCategories[0])
    }
  },
  mounted() {
    axios.get('api/categories?structure=tree', {headers: {
        'Accept': 'application/vnd.exbook.v1+json'
      }
    }).then((response) => {
      this.categories = response.data
    }).catch(() => console.log('error getting categories'))
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