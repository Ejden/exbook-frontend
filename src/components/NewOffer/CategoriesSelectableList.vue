<template>
  <div>
    <v-card>
      <div class="category-toolbar d-flex">
        <v-container v-if="selectedCategory" fluid class="d-flex align-center">
          <span>{{ selectedCategory.name }}</span>
        </v-container>

        <v-container v-else class="d-flex align-center no-category-selected-info">
            <span>Nie wybrano żadnej kategorii</span>
        </v-container>
      </div>

      <div v-if="!pickedCategory">
        <v-container v-if="selectedCategory">
          <button
              @click="goBack()"
          >Cofnij do: {{ backCategoryName }}</button>
        </v-container>
      </div>

      <v-list v-if="!pickedCategory">
        <v-list-item-group>
          <v-list-item
            v-for="category in activeCategories"
            :key="category.id"
            :value="category.id"
            @click="pickCategory(category)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="category.name"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-btn v-if="selectedCategory" @click="resetCategorySelection" block plain>Pokaż wszystkie kategorie</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoriesSelectableList",
  data: () => ({
    parentCategory: null,
    selectedCategory: null,
    pickedCategory: false,
    categories: [],
    activeCategories: []
  }),
  computed: {
    backCategoryName() {
      if (this.parentCategory === null) {
        return 'Wszystkie kategorie'
      } else {
        return this.parentCategory.name
      }
    }
  },
  methods: {
    modifiedSelectedCategoriesEventHandler() {
      this.$emit('changedCategory', this.selectedCategory)
    },
    countCategoryChildren(id) {
      return this.categories.filter(category => category.parentId === id).length
    },
    pickCategory(category) {
      if (category === null) {
        this.parentCategory = null
      } else {
        if (category?.parentId !== null) this.parentCategory = this.categories.find(cat => cat.id === category.parentId)
        else this.parentCategory = null
      }

      this.selectedCategory = category
      this.updateActiveCategories()
    },
    updateActiveCategories() {
      if (this.selectedCategory === null) {
        this.activeCategories = this.categories.filter(category => category.parentId === null)
        return
      }

      if (this.countCategoryChildren(this.selectedCategory.id) > 0) {
        this.activeCategories = this.categories.filter(category => category.parentId === this.selectedCategory.id)
      }

      if (this.countCategoryChildren(this.selectedCategory.id) === 0) {
        this.activeCategories = []
        this.modifiedSelectedCategoriesEventHandler()
        this.pickedCategory = true
      }
    },
    goBack() {
      this.pickCategory(this.parentCategory)
    },
    resetCategorySelection() {
      this.pickedCategory = false
      this.pickCategory(null)
    }
  },
  mounted() {
    axios.get('api/categories', {headers: {
        'Accept': 'application/vnd.exbook.v1+json'
      }
    }).then((response) => {
      this.categories = response.data
      this.updateActiveCategories()
    }).catch((e) => console.log('error getting categories' + e))
  }
}
</script>

<style scoped>
  .category-toolbar {
    background-color: #488fef;
    font-size: 15pt;
    color: white;
    min-height: 50pt;
    border-radius: 0 0 5pt 5pt;
  }

  .no-category-selected-info {
    font-size: 13pt;
  }
</style>