<template>
  <div class="main">
    <v-img
      :src="orderItem.images.thumbnail.url"
      max-height="80"
      max-width="80"
      class="image"
    />

    <div class="author-and-title">
      <span style="font-weight: bolder">{{ orderItem.book.title }}</span>
      <span>{{ orderItem.book.author }}</span>
    </div>

    <div class="price-container">
      <span>{{ orderItem.quantity }} x {{ orderItem.cost.amount }} {{ orderItem.cost.currency }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { OrderItem } from '@/api/OrderApi';

export default defineComponent({
  props: {
    orderItem: {
      type: Object as PropType<OrderItem>
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
