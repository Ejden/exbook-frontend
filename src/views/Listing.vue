<template>
  <v-container class="body">
    <span class="searching-text">szukana fraza: "{{ search }}"</span>
    <div class="mt-3 main-box">
      <left-panel class="left-panel glass"/>

      <offer-listing
          class="offer-listing glass"
          :offers="this.offers"
          :pages="this.pages"
          :pageable="this.pageable"
          v-on:updateResultsDueToSorting="updateResultsDueToSorting"
      />
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import LeftPanel from "../components/listing/leftpanel/LeftPanel";
import OfferListing from "../components/listing/offerlisting/OfferListing";

export default {
  name: "Listing",
  components: {OfferListing, LeftPanel},
  props: ['search', 'categoryId', 'condition', 'type', 'priceFrom', 'priceTo', 'location', 'sort', 'page'],
  data: () => {
    return {
      offers: [],
      pageable: null,
      pages: 1
    }
  },
  methods: {
    updateResultsDueToSorting(sort) {
      console.log("s")
      this.$router.push({ name: 'Listing', query: { sorting: sort, search: this.search }})
    }
  },
  mounted() {
    axios.get('api/listing').then(response => {
      this.offers = response.data.content
      this.pageable = response.data.pageable
      this.pages = response.data.totalPages
    })
  }
}
</script>

<style scoped>
  .searching-text {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 430;
  }

  .body {
    display: flex;
    flex-direction: column;
  }

  .left-panel {
    width: 25%;
  }

  .main-box {
    display: flex;
    align-items: flex-start;
  }

  .offer-listing {
    margin-left: 1rem;
    flex: 1;
  }

  .glass {
    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.7)
    );
    backdrop-filter: blur(10px);
  }
</style>