<template>
  <v-bottom-sheet
      v-model="showModal"
      scrollable
  >
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind="attrs" v-on="on"></slot>
    </template>

    <v-card max-height="700px">
      <v-card-title class="title">
        <span>{{ $t('listing.filtersModalTitle') }}</span>
        <v-btn
            icon
            @click="closeModal"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <left-panel
            :offer-types="offerTypes"
            :location="location"
            :price-from="priceFrom"
            :price-to="priceTo"
            :book-conditions="bookConditions"
            @priceFromUpdated="priceFromUpdatedEventHandler"
            @priceToUpdated="priceToUpdatedEventHandler"
            @locationUpdated="locationUpdatedEventHandler"
            @bookConditionUpdated="bookConditionUpdatedEventHandler"
            @offerTypeUpdated="offerTypeUpdatedEventHandler"
        />
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import LeftPanel from '@/components/listing/leftpanel/LeftPanel.vue';

export default defineComponent({
  components: {
    LeftPanel
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    offerTypes: {
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
    bookConditions: {
      required: false
    }
  },
  setup(props, { emit }) {
    const showModal = computed({
      get: () => props.value,
      set: (value: boolean) => emit('input', value)
    });
    const closeModal = () => showModal.value = false;

    const priceFromUpdatedEventHandler = (value: string) => {
      emit('priceFromUpdated', value);
    }
    const priceToUpdatedEventHandler = (value: string) => {
      emit('priceToUpdated', value);
    }
    const locationUpdatedEventHandler = (location: string) => {
      emit('locationUpdated', location);
    }
    const bookConditionUpdatedEventHandler = (bookConditions: string[]) => {
      emit('bookConditionUpdated', bookConditions);
    }
    const offerTypeUpdatedEventHandler = (offerType: string[]) => {
      emit('offerTypeUpdated', offerType);
    }

    return {
      showModal,
      closeModal,
      priceFromUpdatedEventHandler,
      priceToUpdatedEventHandler,
      locationUpdatedEventHandler,
      bookConditionUpdatedEventHandler,
      offerTypeUpdatedEventHandler
    }
  }
});
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>
