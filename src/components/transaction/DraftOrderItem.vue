<template>
  <div class="main">
    <v-img
        :src="item.offer.images.thumbnail.url"
        max-height="80"
        max-width="80"
        class="image"
    />

    <div class="author-and-title">
      <span style="font-weight: bolder">{{ item.offer.book.title }}</span>
      <span>{{ item.offer.book.author }}</span>
    </div>

    <div class="quantity-input-container">
      sztuk: {{ item.quantity }}
    </div>

    <div class="price-container">
      <div class="price">
        <span>{{ item.totalPrice.amount }} {{ item.totalPrice.currency }}</span>
        <span v-if="quantityIsNotOne" class="price-per-piece"> za sztukę: {{ item.offer.price.amount }} {{ item.offer.price.currency }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { DraftOrderItem } from '@/api/TransactionApi';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<DraftOrderItem>,
      required: true
    }
  },
  setup(props) {
    const quantityIsNotOne = computed(() => props.item.quantity !== 1);

    return {
      quantityIsNotOne
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

.price-container {
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: flex-end;
}

.quantity-input-container {
  display: flex;
  align-items: center;
  margin-right: 20pt;
}

.price-per-piece {
  font-size: small;
}

.price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
