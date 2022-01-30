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
              @click="goBack"
          >Cofnij do: {{ backCategoryName }}</button>
        </v-container>
      </div>

      <v-list v-if="!pickedCategory.value">
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

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api';
import { Category, getCategories } from '@/api/CategoryApi';

export default defineComponent({
  setup(_, { root }) {
    const parentCategory = ref<Category | null>(null);
    const selectedCategory = ref<Category | null>(null);
    const pickedCategory = ref<boolean>(false);
    const categories = ref<Category[]>([]);
    const activeCategories = ref<Category[]>([]);

    const modifiedSelectedCategoriesEventHandler = () => root.$emit('changedCategory', selectedCategory.value);

    const countCategoryChildren = (id: string) => {
      return categories.value.filter((category: Category) => category.parentId === id).length;
    };

    const updateActiveCategories = () => {
      if (selectedCategory.value == null) {
        activeCategories.value = categories.value.filter(category => category.parentId == null);
        return;
      }

      if (countCategoryChildren(selectedCategory.value.id) > 0) {
        activeCategories.value = categories.value.filter(category => category.parentId === selectedCategory.value?.id);
      }

      if (countCategoryChildren(selectedCategory.value.id) === 0) {
        activeCategories.value = [];
        modifiedSelectedCategoriesEventHandler();
        pickedCategory.value = true;
      }
    };

    const pickCategory = (category: Category | null) => {
      if (category == null) {
        parentCategory.value = null;
      } else {
        if (category?.parentId != null) parentCategory.value = categories.value.find(cat => cat.id === category.parentId)!;
        else parentCategory.value = null;
      }

      selectedCategory.value = category;
      updateActiveCategories();
    };

    const goBack = () => pickCategory(parentCategory.value);

    const resetCategorySelection = () => {
      pickedCategory.value = false;
      pickCategory(null);
    };

    onMounted(() => {
      getCategories()
        .then(r => {
          categories.value = r;
          updateActiveCategories();
        })
        .catch(e => new Error('Error getting categories: ' + e));
    });

    const backCategoryName = computed(() => {
      if (parentCategory.value == null) {
        return 'Wszystkie kategorie'
      } else {
        return parentCategory.value?.name;
      }
    });

    return {
      parentCategory,
      selectedCategory,
      pickedCategory,
      categories,
      activeCategories,
      backCategoryName,
      pickCategory,
      goBack,
      resetCategorySelection
    }
  }
})
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
