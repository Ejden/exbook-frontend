<template>
  <div class="main">
    <v-img
        :src="item.images.thumbnail.url"
        max-height="80"
        max-width="80"
        class="image"
    />

    <div class="author-and-title">
      <span style="font-weight: bolder">{{ item.book.title }}</span>
      <span>{{ item.book.author }}</span>
    </div>

    <div class="price-container">
      <span>{{ item.quantity }} x {{ item.cost.amount }} {{ item.cost.currency }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { OrderItem } from '@/api/OrderApi';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<OrderItem>,
      required: true
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
}

.author-and-title {
  margin-left: 10pt;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.image {
  border-radius: 5pt;
}
</style>
