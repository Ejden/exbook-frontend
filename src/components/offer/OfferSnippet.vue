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
          <div v-if="canBuy && offer.cost">
            <span>cena zakupu: </span><span style="font-size: 20pt; font-weight: bold; margin-left: 3pt">{{ offer.cost.amount }}</span>
            <span class="ml-2">zł</span>
          </div>
          <div v-else>
            <span>Ten przedmiot nie ma ceny. Sprzedawca zgodził się jedynie na wymianę</span>
          </div>
        </div>

        <v-divider/>

        <div style="margin-top: 0.5rem; margin-bottom: 0.5rem" v-if="offer.shipping.cheapestMethod">
          <span>Dostawa już od: {{ offer.shipping.cheapestMethod.cost.amount }} zł</span>
          <div>
            <span>Stan: {{ offer.book.condition }}</span>
          </div>
          <div>
            <span>ISBN: {{ offer.book.isbn }}</span>
          </div>
        </div>

        <v-divider/>

        <div class="offer-button-block">
          <v-dialog
              v-model="exchangeDialog.value"
              max-width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  style="margin-top: 0.5rem"
                  block
                  large
                  outlined
                  color="rgba(220, 179, 116)"
              >
                Zaproponuj wymianę
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Propozycja wymiany</v-card-title>

              <v-card-subtitle>Wpisz dane książki, którą chcesz wymienić</v-card-subtitle>

              <v-card-text>
                <v-text-field
                  label="Autor"
                  outlined
                  v-model="exchangingBook.value.author"
                  required
                />

                <v-text-field
                  label="Tytuł"
                  outlined
                  v-model="exchangingBook.value.title"
                  required
                />

                <v-text-field
                  label="ISBN"
                  outlined
                  v-model="exchangingBook.value.isbn"
                />

                <v-select
                  label="Stan"
                  :items="selectableConditions.value"
                  required
                  item-text="name"
                  outlined
                  return-object
                />

                <v-btn
                  block
                  large
                  @click="placeOrder('EXCHANGE')"
                >Zaproponuj wymianę</v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog
              v-model="buyDialog.value"
              max-width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  style="margin-top: 0.5rem"
                  outlined
                  block
                  large
                  color="rgba(0, 184, 141)"
              >
                Kup
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Kup</v-card-title>

              <v-card-subtitle>Wybierz ilość sztuk i zatwierdź zakup</v-card-subtitle>

              <v-card-text>
                <v-text-field
                    label="sztuk"
                    suffix="z 10"
                />

                <v-btn
                    block
                    large
                    @click="placeOrder('BUY')"
                >Kup</v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from '@vue/composition-api';
import { Book, BookCondition, DetailedOffer, Image, OfferType } from '@/api/ListingApi';

export default defineComponent({
  props: {
    offer: {
      type: Object as PropType<DetailedOffer>,
      required: true
    }
  },
  data(props) {
    const placeOrder = (type: string) => console.log(type);
    const pictureIndex = ref<number>(0);
    const buyDialog = ref(false);
    const exchangeDialog = ref<boolean>(false);
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
      placeOrder,
      pictureIndex,
      buyDialog,
      exchangeDialog,
      exchangingBook,
      selectableConditions,
      pictures,
      canBuy,
      offerTypes,
      bookCondition
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
