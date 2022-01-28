<template>
  <div class="mt-3">
    <v-container
        v-if="basketIsLoading"
        class="glass rounded loading-basket"
    >
      <v-progress-circular
          :size="50"
          indeterminate
      />
    </v-container>

    <v-container
        v-else-if="basketIsEmpty"
        class="glass rounded"
    >
      <span class="empty-basket">Wygląda na to, że twój koszyk jest pusty...</span>
    </v-container>

    <v-container v-else class="basket">
      <v-container class="glass rounded basket-items">
        <div>Sprzedawca: nazwa_usera</div>
        <basket-item v-for="(item, idx) in basket.items" :key="idx" :item="item"/>
      </v-container>

      <v-container class="glass rounded price-container">
        <basket-price-container :total-cost="basket.totalOffersCost"/>
      </v-container>
    </v-container>

    <v-container v-if="!basketIsLoading && basketIsEmpty" class="glass rounded mt-3">
      <offers-recommendations class="glass rounded"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import OffersRecommendations from "@/components/offer/OffersRecommendations.vue";
import BasketItem from "@/components/basket/BasketItem.vue";
import BasketPriceContainer from "@/components/basket/BasketPriceContainer.vue";
import { defineComponent, onBeforeMount, computed } from "@vue/composition-api";
import { ref } from "@vue/composition-api";
// eslint-disable-next-line no-unused-vars
import { Basket, getUserBasket } from "@/api/BasketApi";

export default defineComponent({
  components: {
    OffersRecommendations,
    BasketItem,
    BasketPriceContainer
  },
  setup() {
    const basket = ref<Basket | undefined>(undefined);
    const basketIsLoading = computed(() => basket.value === undefined);
    const basketIsEmpty = computed(() => basket.value?.items.length === 0);

    onBeforeMount(() => getUserBasket()
        .then((data) => basket.value = data)
    );

    return {
      basket,
      basketIsLoading,
      basketIsEmpty
    }
  }
})
</script>

<style scoped>
  .basket {
    display: flex;
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
    top: 66pt;
  }

  .basket-items {
    display: flex;
    flex-direction: column;
    flex-basis: 66%;
    gap: 15pt;
  }
</style>
