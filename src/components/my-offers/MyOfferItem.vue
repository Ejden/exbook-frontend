<template>
  <v-card class="offer" flat>
    <div class="offer-info-container">
      <div class="thumbnail">
        <img
            class="image image-link"
            :src="offer.images.thumbnail.url"
            alt="Offer image"
            @click="goToOffer"
        />
      </div>
      <div class="offer-info">
        <span class="title link" @click="goToOffer">{{ offer.book.title }}</span>

        <span class="subtitle-2">{{ offer.book.author }}</span>

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
        <span v-else class="price">{{ $t('home.free') }}</span>
      </div>
    </div>


    <div class="actions">
<!--      <v-btn-->
<!--          class="button"-->
<!--          elevation="0"-->
<!--          text-->
<!--          color="#1976d2"-->
<!--          large-->
<!--      >-->
<!--        {{ $t('myOffersPage.edit') }}-->
<!--      </v-btn>-->
      <v-btn
          class="button"
          elevation="0"
          text
          color="#1976d2"
          large
      >
        {{ $t('myOffersPage.terminate') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { DetailedOffer, OfferType } from '@/api/ListingApi';
import router from '@/router';
import { OfferTypeChip } from '@/components/my-offers/@typings';

export default defineComponent({
  props: {
    offer: {
      type: Object as PropType<DetailedOffer>,
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
  width: 200px;
  height: 130px;
  margin-right: 1rem;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5pt 0 0 5pt;
}

.offer {
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 10px;
}

.offer-info-container {
  display: flex;
  overflow: hidden;
}

.offer-info {
  display: flex;
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

.actions {
  display: flex;
  flex-direction: column;
}

.button:before {
  background: transparent;
}
</style>
