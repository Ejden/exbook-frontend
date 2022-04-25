<template>
  <div class="categories glass rounded">
    <v-subheader>{{ $t('categoriesList.categories') }}</v-subheader>
    <v-divider/>
    <v-list
        dense
        color="transparent"
    >
      <v-list-item-group color="transparent">
        <category-item
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { categoryComparator } from '@/mixin/categoryComparator';
import { getCategories, Category } from '@/api/CategoryApi';
import CategoryItem from '@/components/category/CategoryItem.vue';

export default defineComponent({
  components: {
    CategoryItem
  },
  setup() {
    const categories = ref<Category[]>([]);

    onMounted(() => {
      getCategories()
          .then(response => {
            categories.value = response.categories.filter(category => category.parentId === null).sort(categoryComparator)
          })
          .catch(e => new Error('error getting categories: ' + e));
    });

    return {
      categories
    }
  }
})
</script>

<style scoped>
  .categories {
  }
</style>
