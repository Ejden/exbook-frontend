<template>
  <v-list-item @click="goToCategory" class="main">
    <v-list-item-content>
      <v-list-item-title v-text="category.name"/>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Category } from '@/api/CategoryApi';
import router from '@/router';

export default defineComponent({
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true
    }
  },
  setup(props) {
    const goToCategory = () => router.push({ name: 'CategoryDetailsView', params: { categoryName: props.category.name }});

    return {
      goToCategory
    }
  }
})
</script>

<style>
  .main {
    background: transparent;
  }
</style>
