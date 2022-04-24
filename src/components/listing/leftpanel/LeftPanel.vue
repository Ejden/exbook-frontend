<template>
  <v-card>
    <v-card-title class="section-title">{{ $t('listing.subcategories') }}</v-card-title>

    <v-card-title class="section-title">{{ $t('listing.filters') }}</v-card-title>
    <v-card-text class="condition-box">
      <h3 class="subsection-title">{{ $t('listing.condition') }}</h3>

      <v-checkbox
          v-for="conditionFilter in conditionFilters"
          v-model="selectedConditionFilters"
          :label="conditionFilter.name"
          :value="conditionFilter.value"
          :key="conditionFilter.value"
          class="checkbox condition-checkbox"
      >
      </v-checkbox>

      <h3 class="subsection-title">{{ $t('listing.offerType') }}</h3>

      <v-checkbox
          v-for="offerType in offerTypesFilters"
          v-model="selectedOfferTypeFilters"
          :label="offerType.name"
          :value="offerType.value"
          :key="offerType.value"
          class="checkbox condition-checkbox"
      >
      </v-checkbox>

      <h3 class="subsection-title">{{ $t('listing.price') }}</h3>

      <div style="display: flex; align-items: baseline">
        <v-text-field
          outlined
          dense
          v-model="priceFromFilter"
          :placeholder="$t('listing.priceFrom')"
          style="margin-right: 1rem"
        />
        <span>-</span>
        <v-text-field
          outlined
          dense
          v-model="priceToFilter"
          :placeholder="$t('listing.priceTo')"
          style="margin-left: 1rem"
        />
      </div>

      <h3 class="subsection-title">{{ $t('listing.location') }}</h3>

      <v-text-field
        outlined
        dense
        v-model="locationFilter"
        :placeholder="$t('listing.city')"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { SearchFilter } from '@/components/listing/leftpanel/typings/SearchFilter';
import { i18n } from '@/main';

export default defineComponent({
  setup() {
    const {
      selectedConditionFilters,
      selectedOfferTypeFilters,
      priceFromFilter,
      priceToFilter,
      locationFilter,
      conditionFilters,
      offerTypesFilters
    } = useFilters();

    return {
      selectedConditionFilters,
      selectedOfferTypeFilters,
      priceFromFilter,
      priceToFilter,
      locationFilter,
      conditionFilters,
      offerTypesFilters
    }
  }
});

function useFilters() {
  const selectedConditionFilters = ref<SearchFilter[]>([]);
  const selectedOfferTypeFilters = ref<SearchFilter[]>([]);
  const priceFromFilter = ref('');
  const priceToFilter = ref('');
  const locationFilter = ref('');
  const conditionFilters: SearchFilter[] = [
    {
      name: i18n.t('listing.conditionFilters.new') as string,
      value: 'NEW'
    },
    {
      name: i18n.t('listing.conditionFilters.perfect') as string,
      value: 'PERFECT'
    },
    {
      name: i18n.t('listing.conditionFilters.lightlyUsed') as string,
      value: 'LIGHTLY_USED'
    },
    {
      name: i18n.t('listing.conditionFilters.moderatelyUsed') as string,
      value: 'MODERATELY_USED'
    },
    {
      name: i18n.t('listing.conditionFilters.bad') as string,
      value: 'BAD'
    }
  ];
  const offerTypesFilters: SearchFilter[] = [
    {
      name: i18n.t('listing.offerTypeFilters.buy') as string,
      value: 'BUY'
    },
    {
      name: i18n.t('listing.offerTypeFilters.exchange') as string,
      value: 'EXCHANGE'
    }
  ];

  return {
    selectedConditionFilters,
    selectedOfferTypeFilters,
    priceFromFilter,
    priceToFilter,
    locationFilter,
    conditionFilters,
    offerTypesFilters
  }
}
</script>

<style scoped>
  .section-title {

  }

  .subsection-title {
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 1rem;
  }

  .checkbox {
    margin: -10px 0 0 0;
  }

  .condition-box {
    display: flex;
    flex-direction: column;
  }
</style>
