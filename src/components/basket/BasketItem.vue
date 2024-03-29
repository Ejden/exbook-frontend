<template>
  <div>
    <div class="main">
      <v-img
          :src="item.offer.images.thumbnail.url"
          max-height="50"
          max-width="80"
          class="image image-link"
          @click="goToOffer"
      />

      <div class="author-and-title">
        <span style="font-weight: bolder" @click="goToOffer" class="link">{{ item.offer.book.title }}</span>
        <span>{{ item.offer.book.author }}</span>
      </div>

      <div class="quantity-input-container">
        <v-text-field
            class="quantity-input"
            type="number"
            v-model.number="itemQuantity"
            outlined
            dense
            hide-details
        />
      </div>

      <div class="price-container">
        <div class="price">
          <span>{{ item.totalPrice.amount }} {{ item.totalPrice.currency }}</span>
          <span v-if="quantityIsNotOne" class="price-per-piece"> za sztukę: {{ item.offer.price.amount }} {{ item.offer.price.currency }}</span>
        </div>
      </div>

      <div class="remove-button-container">
        <v-btn icon>
          <v-icon
              size="20"
              @click="removeItem"
          >far fa-trash-alt</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="mobile-lower-row">
      <div class="mobile-quantity-input-container">
        <v-text-field
            class="quantity-input"
            type="number"
            v-model.number="itemQuantity"
            outlined
            dense
            hide-details
        />
      </div>

      <div class="mobile-price-container">
        <div class="price">
          <span>{{ item.totalPrice.amount }} {{ item.totalPrice.currency }}</span>
          <span v-if="quantityIsNotOne" class="price-per-piece"> za sztukę: {{ item.offer.price.amount }} {{ item.offer.price.currency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchPostEffect } from '@vue/composition-api';
import { BasketItem } from '@/api/BasketApi';
import router from '@/router';

export interface BasketItemQuantityChangeEvent {
  offerId: string;
  newQuantity: number;
}

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<BasketItem>,
      required: true
    }
  },
  setup(props, { emit }) {
    const itemQuantity = ref<number>(props.item.quantity);
    const quantityIsNotOne = computed(() => itemQuantity.value !== 1);
    watchPostEffect(async () => {
      if (itemQuantity.value !== props.item.quantity) {
        if (itemQuantity.value <= 0) {
          itemQuantity.value = 1;
        }
        emit('itemQuantityChanged', {
          offerId: props.item.offer.id,
          newQuantity: itemQuantity.value
        } as BasketItemQuantityChangeEvent);
      }
    });
    const removeItem = () => {
      emit('removeItem', props.item.offer.id);
    };
    const goToOffer = () => {
      router.push({ name: 'Offer', params: { offerId: props.item.offer.id } })
    }

    return {
      quantityIsNotOne,
      itemQuantity,
      removeItem,
      goToOffer
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
