<template>
  <v-card>
    <v-card-title class="section-title">Podkategorie</v-card-title>

    <v-card-title class="section-title">Filtry</v-card-title>
    <v-card-text class="condition-box">
      <h3 class="subsection-title">Stan</h3>

      <v-checkbox
          v-for="conditionFilter in conditionFilters"
          v-model="selectedConditionFilters"
          :label="conditionFilter.name"
          :value="conditionFilter.value"
          :key="conditionFilter.value"
          class="checkbox condition-checkbox"
      >
      </v-checkbox>

      <h3 class="subsection-title">Rodzaj oferty</h3>

      <v-checkbox
          v-for="offerType in offerTypes"
          v-model="selectedOfferTypeFilters"
          :label="offerType.name"
          :value="offerType.value"
          :key="offerType.value"
          class="checkbox condition-checkbox"
      >
      </v-checkbox>

      <h3 class="subsection-title">Cena</h3>

      <div style="display: flex; align-items: baseline">
        <v-text-field
          outlined
          dense
          v-model="priceFromFilter"
          placeholder="od"
          style="margin-right: 1rem"
        />
        <span>-</span>
        <v-text-field
          outlined
          dense
          v-model="priceToFilter"
          placeholder="do"
          style="margin-left: 1rem"
        />
      </div>

      <h3 class="subsection-title">Lokalizacja</h3>

      <v-text-field
        outlined
        dense
        v-model="locationFilter"
        placeholder="Miejscowość"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LeftPanel",
  data: () => {
    return {
      selectedConditionFilters: [],
      selectedOfferTypeFilters: [],
      priceFromFilter: '',
      priceToFilter: '',
      locationFilter: '',
      conditionFilters: [
        {
          name: 'nowy',
          value: 'NEW'
        },
        {
          name: 'brak śladów użytkowania',
          value: 'PERFECT'
        },
        {
          name: 'widoczne ślady użytkowania',
          value: 'LIGHTLY_USED'
        },
        {
          name: 'liczne ślady użytkowania',
          value: 'MODERATELY_USED'
        },
        {
          name: 'w złym stanie',
          value: 'BAD'
        }
      ],
      offerTypes: [
        {
          name: 'kup',
          value: 'BUY'
        },
        {
          name: 'wymień',
          value: 'EXCHANGE'
        }
      ]
    }
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