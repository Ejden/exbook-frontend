<template>
  <v-container class="body">
    <span class="searching-text">{{ $t('listing.searchingPhrase') }} "{{ search }}"</span>
    <div class="mt-3 main-box">
      <left-panel
          class="left-panel"
          :offer-types="offerType"
          :location="location"
          :price-from="priceFrom"
          :price-to="priceTo"
          :book-conditions="condition"
          @priceFromUpdated="priceFromUpdatedEventHandler"
          @priceToUpdated="priceToUpdatedEventHandler"
          @locationUpdated="locationUpdatedEventHandler"
          @bookConditionUpdated="bookConditionUpdatedEventHandler"
          @offerTypeUpdated="offerTypeUpdatedEventHandler"
      />

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
        :offer-types="offerType"
        :location="location"
        :price-from="priceFrom"
        :price-to="priceTo"
        :book-conditions="condition"
        @priceFromUpdated="priceFromUpdatedEventHandler"
        @priceToUpdated="priceToUpdatedEventHandler"
        @locationUpdated="locationUpdatedEventHandler"
        @bookConditionUpdated="bookConditionUpdatedEventHandler"
        @offerTypeUpdated="offerTypeUpdatedEventHandler"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getListing, DetailedOffer } from '@/api/ListingApi';
import LeftPanel from '../components/listing/leftpanel/LeftPanel.vue';
import OfferListing from '../components/listing/offerlisting/OfferListing.vue';
import { Pageable } from '@/api/typings/Page';
import LeftPanelModal from '@/components/listing/leftpanel/LeftPanelModal.vue';
import router from '@/router';

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
      required: false
    },
    offerType: {
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
  setup(props) {
    const offers = ref<DetailedOffer[]>([]);
    const pageable = ref<Pageable | undefined>(undefined);
    const pages = ref(1);

    const priceTo = (props.priceTo === '') ? undefined : props.priceTo as unknown as number;
    const priceFrom = (props.priceFrom === '') ? undefined : props.priceFrom as unknown as number;

    getListing(
        props.search,
        props.condition as Array<string>,
        props.offerType as Array<string>,
        priceFrom,
        priceTo,
        (props.location === '') ? undefined : props.location
    )
        .then(r => {
          offers.value = r.content;
          pageable.value = r.pageable;
          pages.value = r.totalPages;
        });

    const updateResultsDueToSorting = (sort: string) => {
      router.push({
        name: 'Listing',
        query: {
          search: props.search,
          condition: !(props.condition instanceof Array) ? [props.condition] : props.condition,
          offerType: props.offerType as Array<string>,
          priceFrom: priceFrom?.toString(),
          priceTo: priceTo?.toString(),
          location: props.location,
          sorting: sort,
        }
      });
    }

    const showLeftPanelModal = ref(false);
    const showFiltersModalEventHandler = () => showLeftPanelModal.value = true;

    const priceToUpdatedEventHandler = (price: string) => {
      router.push({
        name: 'Listing',
        query: {
          search: props.search,
          condition: !(props.condition instanceof Array) ? [props.condition] : props.condition,
          offerType: props.offerType as Array<string>,
          priceFrom: priceFrom?.toString(),
          priceTo: (price === '') ? undefined : (price as unknown as number).toString(),
          location: props.location
        }
      }).catch(() => {});
    }

    const priceFromUpdatedEventHandler = (price: string) => {
      router.push({
        name: 'Listing',
        query: {
          search: props.search,
          condition: !(props.condition instanceof Array) ? [props.condition] : props.condition,
          offerType: props.offerType as Array<string>,
          priceFrom: (price === '') ? undefined : (price as unknown as number).toString(),
          priceTo: priceTo?.toString(),
          location: props.location
        }
      }).catch(() => {});
    }

    const locationUpdatedEventHandler = (location: string) => {
      router.push({
        name: 'Listing',
        query: {
          search: props.search,
          condition: !(props.condition instanceof Array) ? [props.condition] : props.condition,
          offerType: props.offerType as Array<string>,
          priceFrom: priceFrom?.toString(),
          priceTo: priceTo?.toString(),
          location: location
        }
      }).catch(() => {})
    }

    const bookConditionUpdatedEventHandler = (bookConditions: string[]) => {
      router.push({
        name: 'Listing',
        query: {
          search: props.search,
          condition: bookConditions,
          offerType: props.offerType as Array<string>,
          priceFrom: priceFrom?.toString(),
          priceTo: priceTo?.toString(),
          location: props.location
        }
      }).catch(() => {})
    }

    const offerTypeUpdatedEventHandler = (offerType: string[]) => {
      router.push({
        name: 'Listing',
        query: {
          search: props.search,
          condition: !(props.condition instanceof Array) ? [props.condition] : props.condition,
          offerType: offerType,
          priceFrom: priceFrom?.toString(),
          priceTo: priceTo?.toString(),
          location: props.location
        }
      }).catch(() => {})
    }

    return {
      offers,
      pageable,
      pages,
      updateResultsDueToSorting,
      showLeftPanelModal,
      showFiltersModalEventHandler,
      priceToUpdatedEventHandler,
      priceFromUpdatedEventHandler,
      locationUpdatedEventHandler,
      bookConditionUpdatedEventHandler,
      offerTypeUpdatedEventHandler
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
