<template>
  <div class="main">
    <v-subheader>{{ $t('myAccount.myStatistics') }}</v-subheader>

    <v-divider/>

    <div class="statistics">
      <div class="stat-tile">
        <h3 class="stat-value">{{ daysFromRegistration }}</h3>
        <span>{{ $t('myAccount.youAreWithUs') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalSoldOffersCount }}</h3>
        <span>{{ $t('myAccount.soldBooks') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalExchangedOffersCount }}</h3>
        <span>{{ $t('myAccount.exchangedBooks') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ transactionsCount }}</h3>
        <span>{{ $t('myAccount.obtainedBooks') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalGain }} zł</h3>
        <span>{{ $t('myAccount.obtainedFromSell') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ activeOffers }}</h3>
        <span>{{ $t('myAccount.activeOffers') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalOffersMonthViews }}</h3>
        <span>{{ $t('myAccount.monthOfferViews') }}</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ savedMoney }} zł</h3>
        <span>{{ $t('myAccount.saved') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const daysFromRegistration = ref<number>(1);
    const totalSoldOffersCount = ref<number>(10);
    const totalExchangedOffersCount = ref<number>(13);
    const transactionsCount = ref<number>(2);
    const totalGain = ref<number>(10.00);
    const activeOffers = ref<number>(5);
    const totalOffersMonthViews = ref<number>(15556);
    const savedMoney = ref<number>(10.55);

    return {
      daysFromRegistration,
      totalSoldOffersCount,
      totalExchangedOffersCount,
      transactionsCount,
      totalGain,
      activeOffers,
      totalOffersMonthViews,
      savedMoney
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.statistics {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 12pt 12pt 12pt;
  justify-content: space-between;
}

.stat-tile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  padding: 10pt;
  flex: 1 0 21%;
}

.stat-value {
  color: #42b983;
}

@media screen {

}
</style>
