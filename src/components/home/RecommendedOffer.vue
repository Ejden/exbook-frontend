<template>
  <v-card class="offer" flat @click="goToOffer">
    <div class="thumbnail">
      <img
          class="image"
          :src="offer.images.thumbnail.url"
          alt="Offer image"
      />
    </div>
    <div class="offer-info">
      <span class="book-title">{{ offer.book.title }}</span>
      <span class="book-author">{{ offer.book.author }}</span>

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

      <span v-if="hasPrice" class="price"> {{ offer.price.amount }} <span style="font-size: 1rem; font-weight:500">zł</span></span>
      <span v-else class="price">{{ $t('recommendations.freePrice') }}</span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { OfferRecommendation } from '@/api/OfferRecommendationsApi';
import router from '@/router';
import { OfferTypeChip } from '@/components/listing/offerlisting/typings/OfferTypeChip';
import { OfferType } from '@/api/ListingApi';

export default defineComponent({
  props: {
    offer: {
      type: Object as PropType<OfferRecommendation>,
      required: true
    }
  },
  setup(props) {
    const goToOffer = () => router.push({ name: 'Offer', params: { offerId: props.offer.id } });
    const offerTypes = computed<OfferTypeChip[]>(() => {
      let types: OfferTypeChip[] = []
      let buyType = {
        name: 'KUP',
        color: '#00B88D'
      }

      let exchangeType = {
        name: 'WYMIEŃ',
        color: '#E7BB74'
      }

      switch (props.offer.type) {
        case OfferType.EXCHANGE_AND_BUY:
          types.push(buyType, exchangeType);
          break;
        case OfferType.BUY_ONLY:
          types.push(buyType);
          break;
        case OfferType.EXCHANGE_ONLY:
          types.push(exchangeType);
          break;
      }

      return types;
    });

    const hasPrice = props.offer.type !== OfferType.EXCHANGE_ONLY;

    return {
      goToOffer,
      offerTypes,
      hasPrice
    }
  }
});
</script>

<style scoped>
.thumbnail {
  height: 100px;
  margin-right: 1rem;
}

.image {
  height: 100%;
  border-radius: 5pt 0 0 5pt;
}

.offer {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 150px;
}

.offer-info {
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
}

.price {
  font-size: 1rem;
  font-weight: 500;
  margin-top: auto;
}

.book-title {
  font-size: 1rem;
}

.book-author {
  font-size: 0.8rem;
}

</style>
