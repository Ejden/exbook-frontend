<template>
  <div class="main">
    <v-subheader>Twoje statystyki</v-subheader>

    <div class="statistics">
      <div class="stat-tile">
        <h3 class="stat-value">{{ daysFromRegistration }}</h3>
        <span>Tyle dni z nami jesteś</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalSoldOffersCount }}</h3>
        <span>Sprzedanych książek</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalExchangedOffersCount }}</h3>
        <span>Wymienionych książek</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ transactionsCount }}</h3>
        <span>Zyskanych książek</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalGain }} zł</h3>
        <span>Zyskanych ze sprzedaży</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ activeOffers }}</h3>
        <span>Aktywnych ofert</span>
      </div>

      <div class="stat-tile">
        <h3 class="stat-value">{{ totalOffersMonthViews }}</h3>
        <span>Wyświetleń ofert w tym miesiącu</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountStatistics",
  data() {
    return {
      daysFromRegistration: 1,
      totalSoldOffersCount: 10,
      totalExchangedOffersCount: 13,
      transactionsCount: 2,
      totalGain: "10.00",
      activeOffers: 5,
      totalOffersMonthViews: 15556,

    }
  }
}
</script>

<style scoped>
  .main {
    background: white;
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
    text-align: center;
    width: 25pt;
    padding: 10pt;
    flex: 1 0 21%;
  }

  .stat-value {
    color: #42b983;
  }
</style>