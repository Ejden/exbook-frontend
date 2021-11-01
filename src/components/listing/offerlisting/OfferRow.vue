<template>
  <v-card class="offer" flat @click="goToOffer">
    <div class="thumbnail">
      <img
        class="image"
        :src="thumbnailUrl"
      />
    </div>
    <div class="offer-info">
      <span class="title">{{ title }}</span>

      <span class="subtitle-2">{{ author }}</span>

      <div>
        <v-chip-group style="margin-top: -5px">
          <v-chip
              v-for="(offerType, i) in offerTypes"
              :key="i"
              :color="offerType.color"
              x-small
          >{{ offerType.name }}</v-chip>
        </v-chip-group>
      </div>

      <span class="price"> {{ cost.amount }} <span style="font-size: 1rem; font-weight:500">zł</span></span>
    </div>

    <div class="seller-info">
      <span>{{ sellerUsername }}</span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "OfferRow",
  props: ['id', 'title', 'author','thumbnailUrl', 'cost', 'type', 'sellerUsername'],
  methods: {
    goToOffer() {
      this.$router.push({ name: 'Offer', params: { offerId: this.id} })
    }
  },
  computed: {
    offerTypes() {
      let types = []
      let buyType = {
        name: 'KUP',
        color: '#00B88D'
      }

      let exchangeType = {
        name: 'WYMIEŃ',
        color: '#E7BB74'
      }

      switch (this.type) {
        case 'EXCHANGE_AND_BUY':
          types.push(buyType, exchangeType);
          break
        case 'BUY_ONLY':
          types.push(buyType);
          break
        case 'EXCHANGE_ONLY':
          types.push(exchangeType);
          break
      }

      return types
    }
  }
}
</script>

<style scoped>
  .thumbnail {
    height: 130px;
    margin-right: 1rem;
  }

  .image {
    height: 100%;
    border-radius: 5pt 0 0 5pt;
  }

  .offer {
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    padding: 10px;
  }

  .offer:hover {
    background: #c1d5ff;
  }

  .offer-info {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: auto;
    margin-bottom: 0.5rem;
  }

  .seller-info {

  }
</style>