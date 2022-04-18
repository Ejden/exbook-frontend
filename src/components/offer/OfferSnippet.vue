<template>
  <v-card>
    <v-card-title>{{ offer.book.title }}</v-card-title>

    <v-card-subtitle>{{ offer.book.author }}</v-card-subtitle>

    <v-divider/>

    <v-card-text class="book-info">
      <div class="images-carousel">
        <v-carousel v-model="pictureIndex">
          <v-carousel-item
              v-for="(picture, i) in pictures.value" :key="i"
              :src="picture.url"
              reverse-transition="fade-transition"
              transition="fade-transition"
              class="image"
          />
        </v-carousel>
      </div>
      <div class="offer-info">
        <div style="display: flex; flex-direction: column">
          <h2>{{ offer.book.title }}</h2>
          <div style="display: flex; align-items: center; flex-wrap: wrap">
            <span>Od <strong>{{ offer.seller.username }}</strong></span>
            <v-rating
              color="warning"
              background-color="grey"
              dense
              size="20"
              class="ml-1"
              half-increments
              length="5"
              readonly
              :value="offer.seller.grade"
            />
          </div>
        </div>

        <div>
          <v-chip-group>
            <v-chip
                v-for="(offerType, i) in offerTypes.value"
                :key="i"
                :color="offerType.color"
                small
            >{{ offerType.name }}</v-chip>
          </v-chip-group>
        </div>

        <div class="price-block">
          <div v-if="canBuy && offer.price">
            <span>cena zakupu: </span><span style="font-size: 20pt; font-weight: bold; margin-left: 3pt">{{ offer.price.amount }}</span>
            <span class="ml-2">zł</span>
          </div>
          <div v-else>
            <span>Ten przedmiot nie ma ceny. Sprzedawca zgodził się jedynie na wymianę</span>
          </div>
        </div>

        <v-divider/>

        <div style="margin-top: 0.5rem; margin-bottom: 0.5rem" v-if="offer.shipping.cheapestMethod">
          <span>Dostawa już od: {{ offer.shipping.cheapestMethod.price.amount }} zł</span>
          <div>
            <span>Stan: {{ offer.book.condition }}</span>
          </div>
          <div>
            <span>ISBN: {{ offer.book.isbn }}</span>
          </div>
          <div>Dostępnych sztuk: {{ offer.inStock }}</div>
        </div>

        <v-divider/>

        <div class="offer-button-block">
          <div class="stock-input-container">
            <v-text-field
              outlined
              dense
              hide-details
              type="number"
              style="width: 10pt"
              v-bind="pickedQuantity"
            />
            <span class="ml-1">z {{ offer.inStock }}</span>
          </div>

          <v-btn
              v-if="canExchange.value"
              @click="addToBasket('EXCHANGE')"
              style="margin-top: 0.5rem"
              block
              large
              color="rgba(220, 179, 116, 0.5)"
          >
            Zaproponuj wymianę
          </v-btn>

          <v-btn
              v-if="canBuy.value"
              @click="addToBasket('BUY')"
              style="margin-top: 0.5rem"
              block
              large
              color="rgba(0, 184, 141, 0.5)"
          >
            Kup
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from '@vue/composition-api';
import { Book, BookCondition, DetailedOffer, Image, OfferType } from '@/api/ListingApi';
import { addItemToBasket, OrderType } from '@/api/BasketApi';

export default defineComponent({
  props: {
    offer: {
      type: Object as PropType<DetailedOffer>,
      required: true
    }
  },
  data(props) {
    const pickedQuantity = ref<number>(1);
    const addToBasket = (type: string) => {
      addItemToBasket(props.offer.id, type as OrderType, pickedQuantity.value);
    };
    const pictureIndex = ref<number>(0);
    const exchangingBook = ref<Book>({
      author: '',
      title: '',
      isbn: 1,
      condition: BookCondition.NEW
    });
    const selectableConditions = ref([
      {
        condition: 'NEW',
        name: 'Nowa'
      },
      {
        condition: 'PERFECT',
        name: 'Brak śladów użytkowania'
      },
      {
        condition: 'LIGHTLY_USED',
        name: 'Nosi ślady użytkowania'
      },
      {
        condition: 'MODERATELY_USED',
        name: 'Nosi liczne ślady użytkowania'
      },
      {
        condition: 'BAD',
        name: 'W złym stanie'
      }
    ]);

    const pictures = computed(() => {
      if (props.offer.images.thumbnail === undefined) {
        return [{
          url: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        } as Image];
      }
      let pics = [];
      pics.push(props.offer.images.thumbnail);

      return pics;
    });

    const canBuy = computed(() => {
      return props.offer.type !== 'EXCHANGE_ONLY';
    });
    const canExchange = computed(() => props.offer.type != 'BUY_ONLY');

    const offerTypes = computed( () => {
      let types = [];
      let buyType = {
        name: 'KUP',
        color: '#00B88D'
      };

      let exchangeType = {
        name: 'WYMIEŃ',
        color: '#E7BB74'
      };

      switch (props.offer.type) {
        case OfferType.EXCHANGE_AND_BUY:
          types.push(buyType, exchangeType);
          break
        case OfferType.BUY_ONLY:
          types.push(buyType);
          break
        case OfferType.EXCHANGE_ONLY:
          types.push(exchangeType);
          break
      }

      return types
    });

    const bookCondition = () => {
      switch (props.offer.book.condition) {
        case 'NEW': return 'NOWA'
        case 'PERFECT': return 'UŻYWANA'
        case 'LIGHTLY_USED': return 'WIDOCZNE ŚLADY UŻYTKOWANIA'
        case 'MODERATELY_USED': return 'LICZNE ŚLADY UŻYTKOWANIA'
        case 'BAD': return 'W ZŁYM STANIE'
        default: return 'NIEZNANY'
      }
    };

    return {
      addToBasket,
      pictureIndex,
      exchangingBook,
      selectableConditions,
      pictures,
      canBuy,
      canExchange,
      offerTypes,
      bookCondition,
      pickedQuantity
    }
  }
})
</script>

<style scoped>
  .book-info {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: row;
  }

  .images-carousel {
    border-radius: 5px;
    overflow: hidden;
    flex-grow: 2;
    max-width: 60%;
    margin-right: 1rem;
  }

  .offer-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .image {
    width: content-box;
  }

  .price-block {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .offer-button-block {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }

  .stock-input-container {
    display: flex;
    width: 150pt;
    align-items: flex-end;
  }

  @media screen and (max-width: 768px) {
    .book-info {
      flex-direction: column;
    }

    .images-carousel {
      max-width: 100%;
      margin-right: 0;
    }

  }
</style>
