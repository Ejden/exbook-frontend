<template>
  <v-card
      elevation="0"
  >
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
          :value="priceFromFilter"
          @input="lazyCallerPriceFrom($event)"
          @focusout="lazyCallerPriceFrom($event.target.value, true)"
          @keydown.enter="lazyCallerPriceFrom($event.target.value, true)"
          :placeholder="$t('listing.priceFrom')"
          style="margin-right: 1rem"
        />
        <span>-</span>
        <v-text-field
          outlined
          dense
          :value="priceToFilter"
          @input="lazyCallerPriceTo($event)"
          @focusout="lazyCallerPriceTo($event.target.value, true)"
          @keydown.enter="lazyCallerPriceTo($event.target.value, true)"
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
        @focusout="updateLocationFilter"
        @keydown.enter="updateLocationFilter"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import { ConditionFilter, OfferType, OfferTypeFilter } from '@/components/listing/leftpanel/typings';
import { i18n } from '@/main';
import { BookCondition } from '@/api/CommonTypings';

export default defineComponent({
  props: {
    types: {
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
    const bookConditions = (props.bookConditions instanceof String) ? [props.bookConditions] : props.bookConditions as Array<string>;
    const offerTypes = (props.types instanceof String) ? [props.types] : props.types as Array<string>;

    const {
      selectedConditionFilters,
      selectedOfferTypeFilters,
      priceFromFilter,
      lazyCallerPriceFrom,
      priceToFilter,
      lazyCallerPriceTo,
      locationFilter,
      conditionFilters,
      offerTypesFilters
    } = useFilters(emit, offerTypes as Array<string>, props.priceFrom, props.priceTo, props.location, bookConditions as Array<string>);

    const updateLocationFilter = () => {
      emit('locationUpdated', locationFilter.value);
    }

    return {
      selectedConditionFilters,
      selectedOfferTypeFilters,
      priceFromFilter,
      priceToFilter,
      locationFilter,
      conditionFilters,
      offerTypesFilters,
      lazyCallerPriceFrom,
      lazyCallerPriceTo,
      updateLocationFilter
    }
  }
});

function useFilters(emit: any, types?: string[], priceFrom?: string, priceTo?: string, location?: string, condition?: string[]) {
  const selectedConditionFilters = ref<string[]>(condition || []);
  const selectedOfferTypeFilters = ref<string[]>(types || []);
  const priceFromFilter = ref<string>(priceFrom || '');
  const priceToFilter = ref<string>(priceTo || '');
  const locationFilter = ref<string>(location || '');
  const timeoutPriceFrom = ref<number | undefined>(undefined);
  const timeoutPriceTo = ref<number | undefined>(undefined);

  const lazyCallerPriceFrom = (value?: any, forceUpdate: boolean = false) => {
    clearTimeout(timeoutPriceFrom.value);
    if (value === priceFromFilter?.value && !forceUpdate) return;
    if (forceUpdate) {
      priceFromFilter.value = value;
      emit('priceFromUpdated', value);
    } else {
      timeoutPriceFrom.value = setTimeout(() => {
        priceFromFilter.value = value;
        emit('priceFromUpdated', value);
      }, 1500);
    }
  }

  const lazyCallerPriceTo = (value?: any, forceUpdate: boolean = false) => {
    clearTimeout(timeoutPriceTo.value);
    if (value === priceToFilter?.value && !forceUpdate) return;
    if (forceUpdate) {
      priceToFilter.value = value;
      emit('priceToUpdated', value);
    } else {
      timeoutPriceTo.value = setTimeout(() => {
        priceToFilter.value = value;
        emit('priceToUpdated', value);
      }, 1500)
    }
  }

  watch(selectedConditionFilters, (selectedConditions: string[]) => {
    emit('bookConditionUpdated', selectedConditions);
  });

  watch(selectedOfferTypeFilters, (selectedOfferTypes: string[]) => {
    emit('offerTypeUpdated', selectedOfferTypes);
  });

  const conditionFilters: ConditionFilter[] = [
    {
      name: i18n.t('listing.conditionFilters.new') as string,
      value: BookCondition.NEW
    },
    {
      name: i18n.t('listing.conditionFilters.perfect') as string,
      value: BookCondition.PERFECT
    },
    {
      name: i18n.t('listing.conditionFilters.lightlyUsed') as string,
      value: BookCondition.LIGHTLY_USED
    },
    {
      name: i18n.t('listing.conditionFilters.moderatelyUsed') as string,
      value: BookCondition.MODERATELY_USED
    },
    {
      name: i18n.t('listing.conditionFilters.bad') as string,
      value: BookCondition.BAD
    }
  ];
  const offerTypesFilters: OfferTypeFilter[] = [
    {
      name: i18n.t('listing.offerTypeFilters.buy') as string,
      value: OfferType.BUY
    },
    {
      name: i18n.t('listing.offerTypeFilters.exchange') as string,
      value: OfferType.EXCHANGE
    }
  ];

  return {
    selectedConditionFilters,
    selectedOfferTypeFilters,
    priceFromFilter,
    lazyCallerPriceFrom,
    priceToFilter,
    lazyCallerPriceTo,
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
