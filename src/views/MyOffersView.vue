<template>
  <div class="main">
    <div class="offers-container">
      <v-container>
        <v-pagination
            v-model="page"
            :length="totalPages"
        />
      </v-container>

      <v-container v-if="thereAreNoOffers" class="no-offers-container">
        <span>{{ $t('myOffersPage.noOffers') }}</span>
      </v-container>

      <v-container
          v-else
          v-for="offer in offers"
          :key="offer.id"
      >
        <my-offer-item
            :offer="offer"
        />
      </v-container>

      <v-container>
        <v-pagination
            v-model="page"
            :length="totalPages"
        />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import MyOfferItem from '@/components/my-offers/MyOfferItem.vue';
import { DetailedOffer, getUserOffers } from '@/api/ListingApi';

export default defineComponent({
  components: {
    MyOfferItem
  },
  setup() {
    const offers = ref<DetailedOffer[]>([]);
    const thereAreNoOffers = computed(() => offers.value.length === 0);
    const page = ref(1);
    const totalPages = ref(1);

    getUserOffers(page.value, 10)
        .then(response => {
          totalPages.value = response.data.totalPages;
          offers.value = response.data.content;
        });
    watch(page, async (newPage: number) => {
      getUserOffers(newPage, 10)
          .then(response => {
            totalPages.value = response.data.totalPages;
            offers.value = response.data.content;
          });
    });

    return {
      offers,
      thereAreNoOffers,
      page,
      totalPages
    }
  }
});
</script>

<style scoped>
.main {
  height: 100%;
  margin: auto;
}

.no-offers-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.offers-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1000px;
}
</style>
