<template>
  <div class="margin-top-8 main">
    <v-container
        v-if="basketIsLoading"
        class="rounded loading-basket"
    >
      <v-progress-circular
          :size="50"
          indeterminate
      />
    </v-container>

    <v-container
        v-else-if="basketIsEmpty"
        class="glass rounded empty-basket-container"
    >
      <v-icon class="basket-icon" size="300">fas fa-shopping-basket</v-icon>
      <span class="empty-basket">Wygląda na to, że twój koszyk jest pusty...</span>
    </v-container>

    <v-container v-else class="basket">
      <div class="basket-groups">
        <basket-items-group
            v-for="(itemsGroup, index) in basket.itemsGroups"
            :key="index"
            :items-group="itemsGroup"
            @itemQuantityChanged="itemQuantityChangedEventHandler"
            @removeItem="removeItemEventHandler"
            @addExchangeBook="addExchangeBookEventHandler"
            @removeExchangeBook="removeExchangeBookEventHandler"
        >
        </basket-items-group>
      </div>

      <v-container class="container-standard-background rounded price-container">
        <basket-price-container
            :total-cost="basket.totalOffersCost"
            :loading="nextStepButtonLoading"
            @pickDelivery="pickDeliveryEventHandler"
        />
      </v-container>
    </v-container>

    <v-container v-if="!basketIsLoading && basketIsEmpty" class="container-standard-background rounded mt-3">
      <offers-recommendations class="container-standard-background rounded"/>
    </v-container>

    <notification-popup
        :type="notificationType"
        close-button-message="Zamknij"
        :duration="notificationDuration"
        message="Dodano książkę"
        v-model="showNotification"
     />
  </div>
</template>

<script lang="ts">
import OffersRecommendations from '@/components/offer/OffersRecommendations.vue';
import BasketPriceContainer from '@/components/basket/BasketPriceContainer.vue';
import { NotificationType } from '@/components/notification/@types/NotificationType';
import { NotificationDuration } from '@/components/notification/@types/NotificationDuration';
import { computed, defineComponent, onBeforeMount, ref } from '@vue/composition-api';
import {
  addExchangeBookToBasket,
  Basket,
  changeItemQuantityInBasket,
  getUserBasket, removeExchangeBookFromBasket,
  removeItemFromBasket
} from '@/api/BasketApi';
import BasketItemsGroup, {
  BasketItemGroupQuantityChangeEvent,
  RemoveItemEvent
} from '@/components/basket/BasketItemsGroup.vue';
import { AddExchangeBookEvent } from '@/components/basket/@types/AddExchangeBookEvent';
import NotificationPopup from '@/components/notification/NotificationPopup.vue';
import { RemoveExchangeBookEvent } from '@/components/basket/@types/RemoveExchangeBookEvent';
import router from '@/router';

export default defineComponent({
  components: {
    NotificationPopup,
    BasketItemsGroup,
    OffersRecommendations,
    BasketPriceContainer
  },
  setup() {
    const basket = ref<Basket | undefined>(undefined);
    const basketIsLoading = computed(() => basket.value === undefined);
    const basketIsEmpty = computed(() => basket.value?.itemsGroups.length === 0);
    const nextStepButtonLoading = ref<boolean>(false);
    const notificationType = ref<NotificationType>(NotificationType.INFO);
    const showNotification = ref(false);
    const notificationDuration = NotificationDuration.NORMAL;
    const enableLoadingState = () => nextStepButtonLoading.value = true;
    const disableLoadingState = () => nextStepButtonLoading.value = false;
    const itemQuantityChangedEventHandler = ({ offerId, newQuantity, orderType } : BasketItemGroupQuantityChangeEvent) => {
      enableLoadingState();
      changeItemQuantityInBasket(offerId, newQuantity, orderType)
      .then(() => getUserBasket()
          .then(data => basket.value = data)
          .then(() => disableLoadingState())
      )
      .catch(() => disableLoadingState());
    };
    const removeItemEventHandler = ({ offerId, orderType } : RemoveItemEvent) => {
      nextStepButtonLoading.value = true;
      removeItemFromBasket(offerId, orderType)
      .then(() => getUserBasket()
        .then(data => basket.value = data)
        .then(() => nextStepButtonLoading.value = false)
      )
      .catch(() => disableLoadingState());
    };
    const addExchangeBookEventHandler = (event: AddExchangeBookEvent) => {
      enableLoadingState();
      addExchangeBookToBasket(event.sellerId, {
        author: event.author,
        title: event.title,
        isbn: event.isbn,
        condition: event.condition,
        quantity: event.quantity
      }).then(() => getUserBasket()
          .then(data => basket.value = data)
          .then(() => disableLoadingState())
      ).then(() => showNotification.value = true)
      .catch(() => disableLoadingState());
    };
    const removeExchangeBookEventHandler = (event: RemoveExchangeBookEvent) => {
      nextStepButtonLoading.value = true;
      removeExchangeBookFromBasket(event.sellerId, event.exchangeBookId)
      .then(() => getUserBasket()
        .then(data => basket.value = data)
        .then(() => nextStepButtonLoading.value = false)
      )
      .catch(() => disableLoadingState())
    };
    const pickDeliveryEventHandler = () => {
      router.push({ name: 'Transaction' })
    };

    onBeforeMount(() => getUserBasket()
        .then((data) => basket.value = data)
        .catch((error: Error) => new Error(error.message))
    );

    return {
      basket,
      basketIsLoading,
      basketIsEmpty,
      itemQuantityChangedEventHandler,
      removeItemEventHandler,
      addExchangeBookEventHandler,
      removeExchangeBookEventHandler,
      nextStepButtonLoading,
      notificationType,
      showNotification,
      notificationDuration,
      pickDeliveryEventHandler
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
}

.basket {
  display: flex;
  flex-direction: row;
  gap: 10pt;
}

.loading-basket {
  justify-content: center;
  height: 30vh;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  font-size: 20pt;
}

.price-container {
  height: 120pt;
  flex-basis: 34%;
  position: sticky;
  top: 80px;
}

.basket-groups {
  display: flex;
  flex-direction: column;
  flex-basis: 66%;
  gap: 15pt;
}

.empty-basket-container {
  display: flex;
  padding: 50pt;
  align-items: center;
}

.empty-basket {
  flex-grow: 1;
  text-align: center;
  font-size: 16pt;
}

@media screen and (max-width: 900px) {
  .basket {
    flex-direction: column;
  }
}
</style>
