<template>
  <div>
    <div class="main">
      <v-img
          :src="item.offer.images.thumbnail.url"
          max-height="80"
          max-width="80"
          class="image image-link"
          @click="goToOffer"
      />

      <div class="author-and-title">
        <span
            class="link"
            style="font-weight: bolder"
            @click="goToOffer"
        >{{ item.offer.book.title }}</span>
        <span>{{ item.offer.book.author }}</span>
      </div>

      <div class="quantity-input-container">
        {{ $t('basketTransaction.quantity') }} {{ item.quantity }}
      </div>

      <div class="price-container">
        <div class="price">
          <span>{{ item.totalPrice.amount }} {{ item.totalPrice.currency }}</span>
          <span v-if="quantityIsNotOne" class="price-per-piece">
            {{ $t('basketTransaction.perUnit') }}
            {{ item.offer.price.amount }} {{ item.offer.price.currency }}
          </span>
        </div>
      </div>
    </div>

    <div class="mobile-lower-row">
      <div class="mobile-quantity-input-container">
        {{ $t('basketTransaction.quantity') }} {{ item.quantity }}
      </div>

      <div class="mobile-price-container">
        <div class="price">
          <span>{{ item.totalPrice.amount }} {{ item.totalPrice.currency }}</span>
          <span v-if="quantityIsNotOne" class="price-per-piece">
            {{ $t('basketTransaction.perUnit') }}
            {{ item.offer.price.amount }} {{ item.offer.price.currency }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { DraftOrderItem } from '@/api/TransactionApi';
import router from '@/router';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<DraftOrderItem>,
      required: true
    }
  },
  setup(props) {
    const quantityIsNotOne = computed(() => props.item.quantity !== 1);
    const goToOffer = () => router.push({ name: 'Offer', params: { offerId: props.item.offer.id } });

    return {
      quantityIsNotOne,
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

.mobile-lower-row {
  display: none;
}

.mobile-quantity-input-container {
  display: flex;
  align-items: center;
  margin-right: 20pt;
}

.mobile-price-container {
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .mobile-lower-row {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .price-container {
    display: none;
  }

  .quantity-input-container {
    display: none;
  }
}
</style>
