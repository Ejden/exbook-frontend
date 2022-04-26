<template>
  <v-container class="body">
    <span class="searching-text">{{ $t('listing.searchingPhrase') }} "{{ search }}"</span>
    <div class="mt-3 main-box">
      <left-panel class="left-panel"/>

      <offer-listing
          class="offer-listing"
          :offers="offers"
          :pages="pages"
          :pageable="pageable"
          v-on:updateResultsDueToSorting="updateResultsDueToSorting"
          @showFiltersModal="showFiltersModalEventHandler"
      />
    </div>

    <left-panel-modal
        v-model="showLeftPanelModal"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getListing, DetailedOffer } from '@/api/ListingApi';
import LeftPanel from '../components/listing/leftpanel/LeftPanel.vue';
import OfferListing from '../components/listing/offerlisting/OfferListing.vue';
import { Pageable } from '@/typings/Page';
import LeftPanelModal from '@/components/listing/leftpanel/LeftPanelModal.vue';

export default defineComponent({
  components: {
    LeftPanelModal,
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
    const showLeftPanelModal = ref(false);
    const showFiltersModalEventHandler = () => showLeftPanelModal.value = true;

    return {
      offers,
      pageable,
      pages,
      updateResultsDueToSorting,
      showLeftPanelModal,
      showFiltersModalEventHandler
    }
  }
});
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
  flex-basis: 20%;
}

.main-box {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.offer-listing {
  flex: 1;
}

@media screen and (max-width: 1300px){
  .left-panel {
    flex-basis: 30%;
  }
}

@media screen and (max-width: 900px) {
  .left-panel {
    display: none;
  }
}
</style>
