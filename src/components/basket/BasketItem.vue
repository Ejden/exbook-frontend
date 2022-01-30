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
      <v-text-field outlined dense hide-details type="number" class="quantity-input"/>
    </div>

    <div class="price-container">
      <div class="price">
        <span>{{ item.price.amount }} {{ item.price.currency }}</span>
        <span v-if="!quantityIsOne" class="price-per-piece"> za sztukę: {{ item.offer.price.amount }} {{ item.offer.price.currency }}</span>
      </div>
    </div>

    <div class="remove-button-container">
      <v-btn icon>
        <i class="far fa-trash-alt"></i>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { BasketItem } from '@/api/BasketApi';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<BasketItem>,
      required: true
    }
  },
  setup(props) {
    const quantityIsOne = () => props.item.quantity === 1;

    return {
      quantityIsOne
    }
  }
})
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

  .remove-button-container {
    display: flex;
    align-items: center;
  }

  .quantity-input-container {
    display: flex;
    align-items: center;
    margin-right: 20pt;
  }

  .quantity-input {
    width: 75px;
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
