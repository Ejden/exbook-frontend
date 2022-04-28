<template>
  <div class="main">
    <v-img
        :src="item.images.thumbnail.url"
        max-height="80"
        max-width="80"
        class="image image-link"
        @click="goToOffer"
    />

    <div class="author-and-title">
      <div>
        <span
            class="link"
            style="font-weight: bolder"
            @click="goToOffer"
        >{{ item.book.title }}</span>
      </div>
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
import router from '@/router';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<OrderItem>,
      required: true
    }
  },
  setup(props) {
    const goToOffer = () => router.push({ name: 'Offer', params: { offerId: props.item.offerId } });

    return {
      goToOffer
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
