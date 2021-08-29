<template>
  <v-card>
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
            :id="offer.id"
            :title="offer.book.title"
            :author="offer.book.author"
            :cost="offer.cost"
            :thumbnail-url="offer.images.thumbnail.url"
            :seller-username="offer.seller.username"
            :type="offer.type"
            class="offer"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import OfferRow from "./OfferRow";
export default {
  name: "OfferListing",
  components: {OfferRow},
  props: ['offers', 'pageable', 'pages'],
  data: () => {
    return {
      selectedSortingMethod: {
        text: 'czas dodania: najnowsze',
        value: 'dd'
      },
      sortingMethods: [
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
      ]
    }
  },
  methods: {
    sortResults() {
      this.$emit('updateResultsDueToSorting', this.selectedSortingMethod.value)
    }
  }
}
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