<template>
  <v-card
      elevation="0"
      class="offers-container"
  >
    <v-card-text class="actions">
      <div class="first-button-group">
        <v-select
          :items="sortingMethods"
          v-model="selectedSortingMethod"
          outlined
          dense
          return-object
          class="sorting-methods-select"
          @change="sortResults()"
        />
      </div>

      <v-btn
          class="filter-button"
          @click="showFiltersModal"
          left
          icon
      >
        <v-icon>fas fa-filter</v-icon>
      </v-btn>

      <v-pagination
        total-visible="3"
        :length="pages"
        class="top-pagination-button"
      />
    </v-card-text>

    <v-card-text v-if="offers.length !== 0">
      <div v-for="offer in offers" :key="offer.id">
        <offer-row
            :offer="offer"
            class="offer"
        />
      </div>
    </v-card-text>

    <v-card-text v-else class="not-found-container">
      <h4>{{ $t('listing.notFound') }}</h4>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';
import OfferRow from "./OfferRow.vue";
import { DetailedOffer } from '@/api/ListingApi';
import { SortingMethod } from '@/components/listing/offerlisting/typings/SortingMethod';

export default defineComponent({
  components: {
    OfferRow
  },
  props: {
    offers: {
      type: Array as PropType<Array<DetailedOffer>>,
      required: true
    },
    pageable: {

    },
    pages: {
      type: Number,
      required: true
    }
  },
  setup(_, { emit }) {
    const selectedSortingMethod = ref<SortingMethod>({
      text: 'czas dodania: najnowsze',
      value: 'dd'
    });
    const sortingMethods = ref<SortingMethod[]>([
      {
        text: 'cena: od najniższej',
        value: 'pa'
      },
      {
        text: 'cena: od najwyższej',
        value: 'pd'
      },
      {
        text: 'czas dodania: najnowsze',
        value: 'dd'
      },
      {
        text: 'czas dodania: najstarsze',
        value: 'da'
      }
    ]);

    const sortResults = () => emit('updateResultsDueToSorting', selectedSortingMethod.value.value);
    const showFiltersModal = () => emit('showFiltersModal');

    return {
      selectedSortingMethod,
      sortingMethods,
      sortResults,
      showFiltersModal
    }
  }
});
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
}

.first-button-group {
  display: flex;
  flex-direction: column;
}

.sorting-methods-select {
  max-width: 250px;
}

.offer {
  height: 150px;
  width: 100%;
  margin-bottom: 1rem;
}

.top-pagination-button {
  margin-top: 0;
}

.not-found-container {
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 900px) {
  .filter-button {
    display: none;
  }
}

@media screen and (max-width: 900px) {
  .sorting-methods-select {
    max-width: 100px;
  }

  .offer {
    height: auto;
    min-height: 150px;
  }
}
</style>
