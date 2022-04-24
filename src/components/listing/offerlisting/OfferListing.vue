<template>
  <v-card class="offers-container">
    <v-card-text class="actions">
      <v-select
        :items="sortingMethods"
        v-model="selectedSortingMethod"
        outlined
        dense
        return-object
        class="sorting-methods-select"
        @change="sortResults()"
      />

      <v-pagination
        total-visible="3"
        :length="pages"
        class="top-pagination-button"
      />
    </v-card-text>

    <v-card-text>
      <div v-for="offer in offers" :key="offer.id">
        <offer-row
            :offer="offer"
            class="offer"
        />
      </div>
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

    return {
      selectedSortingMethod,
      sortingMethods,
      sortResults
    }
  }
})
</script>

<style scoped>
  .actions {
    display: flex;
    justify-content: space-between;
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
</style>
