<template>
  <div class="glass rounded container">
    <div class="group-title">
      <h3>{{ $t('basket.seller') }}: {{ itemsGroup.seller.firstName }} {{ itemsGroup.seller.lastName }}</h3>
      <h5>{{ $t('basket.orderType') }}: {{ orderTypeText }}</h5>
    </div>

    <div class="basket-items">
      <basket-item
          class="basket-item"
          v-for="item in itemsGroup.items"
          :key="item.offer.id"
          :item="item"
          @itemQuantityChanged="itemQuantityChangedEventHandler"
          @removeItem="removeItemEventHandler"
      ></basket-item>
    </div>

    <v-divider class="margin-top-8 margin-bottom-8"/>

    <basket-items-group-summary
        :total-offers-price="itemsGroup.groupTotalOffersPrice"
    />

    <div v-if="showExchangeBooks">
      <v-divider class="margin-top-8 margin-bottom-8"/>

      <basket-exchanging-books
          :exchange-books="itemsGroup.exchangeBooks"
          @addExchangeBook="addExchangeBookEventHandler"
          @removeExchangeBook="removeExchangeBookEventHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { ItemsGroup, OrderType } from '@/api/BasketApi';
import BasketItem, { BasketItemQuantityChangeEvent } from '@/components/basket/BasketItem.vue';
import BasketItemsGroupSummary from '@/components/basket/BasketItemsGroupSummary.vue';
import BasketExchangingBooks from '@/components/basket/BasketExchangingBooks.vue';
import { Book } from '@/components/basket/ExchangeBookFormDialog.vue';
import { AddExchangeBookEvent } from '@/components/basket/@types/AddExchangeBookEvent';

export interface BasketItemGroupQuantityChangeEvent extends BasketItemQuantityChangeEvent{
  orderType: OrderType;
}

export interface RemoveItemEvent {
  offerId: string;
  orderType: OrderType;
}

export default defineComponent({
  components: { BasketExchangingBooks, BasketItemsGroupSummary, BasketItem },
  props: {
    itemsGroup: {
      type: Object as PropType<ItemsGroup>,
      required: true
    },
  },
  setup(props, { emit }) {
    const orderTypeText = (props.itemsGroup.orderType === OrderType.BUY) ? 'Kupno' : 'Wymiana';
    const itemQuantityChangedEventHandler = ({ offerId, newQuantity }: BasketItemQuantityChangeEvent) => {
      emit('itemQuantityChanged', {
        offerId: offerId,
        newQuantity: newQuantity,
        orderType: props.itemsGroup.orderType
      } as BasketItemGroupQuantityChangeEvent);
    };
    const removeItemEventHandler = (offerId: string) => {
      emit('removeItem', {
        offerId: offerId,
        orderType: props.itemsGroup.orderType
      } as RemoveItemEvent)
    };
    const showExchangeBooks = computed(() => props.itemsGroup.orderType === OrderType.EXCHANGE);
    const addExchangeBookEventHandler = (book: Book) => {
      emit('addExchangeBook', {
        ...book,
        sellerId: props.itemsGroup.seller.id
      } as AddExchangeBookEvent);
    };
    const removeExchangeBookEventHandler = (exchangeBookId: string) => {
      emit('removeExchangeBook', {
        exchangeBookId: exchangeBookId,
        sellerId: props.itemsGroup.seller.id
      });
    };

    return {
      orderTypeText,
      itemQuantityChangedEventHandler,
      removeItemEventHandler,
      showExchangeBooks,
      addExchangeBookEventHandler,
      removeExchangeBookEventHandler
    }
  }
});
</script>

<style scoped>
.group-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.basket-items {
 display: flex;
 flex-direction: column;
 row-gap: 8px;
 margin-top: 16px;
}
</style>
