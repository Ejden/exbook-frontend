<template>
  <v-container class="body">
    <span class="searching-text">szukana fraza: "{{ search }}"</span>
    <div class="mt-3 main-box">
      <left-panel class="left-panel glass"/>

      <offer-listing
          class="offer-listing glass"
          :offers="offers"
          :pages="pages"
          :pageable="pageable"
          v-on:updateResultsDueToSorting="updateResultsDueToSorting"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getListing, DetailedOffer } from '@/api/ListingApi';
import LeftPanel from '../components/listing/leftpanel/LeftPanel.vue';
import OfferListing from '../components/listing/offerlisting/OfferListing.vue';
import { Pageable } from '@/typings/Page';

export default defineComponent({
  components: {
    OfferListing,
    LeftPanel
  },
  props: {
    search: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: false
    },
    condition: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    priceFrom: {
      type: String,
      required: false
    },
    priceTo: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    },
    sort: {
      type: String,
      required: false
    },
    page: {
      type: String,
      required: false
    }
  },
  setup(props, { root }) {
    const offers = ref<DetailedOffer[]>([]);
    const pageable = ref<Pageable | undefined>(undefined);
    const pages = ref(1);

    getListing()
        .then(r => {
          offers.value = r.content;
          pageable.value = r.pageable;
          pages.value = r.totalPages;
        });

    const updateResultsDueToSorting = (sort: string) => root.$router.push({
      name: 'Listing',
      query: {
        sorting: sort,
        search: props.search
      }
    });

    return {
      offers,
      pageable,
      pages,
      updateResultsDueToSorting
    }
  }
})
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
