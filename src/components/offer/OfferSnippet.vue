<template>
  <v-card>
    <v-card-title>{{ bookTitle }}</v-card-title>

    <v-card-subtitle>{{ bookAuthor }}</v-card-subtitle>

    <v-divider/>

    <v-card-text class="book-info">
      <div class="images-carousel">
        <v-carousel v-model="pictureIndex">
          <v-carousel-item
              v-for="(picture, i) in pictures" :key="i"
              :src="picture.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
              class="image"
          />
        </v-carousel>
      </div>
      <div class="offer-info">
        <div style="display: flex; flex-direction: column">
          <h2>{{ bookTitle }}</h2>
          <div style="display: flex; align-items: center; flex-wrap: wrap">
            <span>Od <strong>{{ sellerName }}</strong></span>
            <v-rating
              color="warning"
              background-color="grey"
              dense
              size="20"
              class="ml-1"
              half-increments
              length="5"
              readonly
              :value="grade"
            />
          </div>
        </div>

        <div>
          <v-chip-group>
            <v-chip
                v-for="(offerType, i) in offerTypes"
                :key="i"
                :color="offerType.color"
                small
            >{{ offerType.name }}</v-chip>
          </v-chip-group>
        </div>

        <div class="price-block">
          <div v-if="canBuy">
            <span>cena zakupu: </span><span style="font-size: 20pt; font-weight: bold">{{ price/100 }}</span>zł
          </div>
          <div v-else>
            <span>Ten przedmiot nie ma ceny. Sprzedawca zgodził się jedynie na wymianę</span>
          </div>
        </div>

        <v-divider/>

        <div style="margin-top: 0.5rem; margin-bottom: 0.5rem">
          <span>Dostawa już od: {{ theCheapestMethodPrice }}zł</span>
          <div>
            <span>Stan: {{ bookCondition }}</span>
          </div>
          <div>
            <span>ISBN: {{ isbn }}</span>
          </div>
        </div>

        <v-divider/>



        <div class="offer-button-block">
          <v-btn
            block
            large
            color="#E7BB74"
          >
            Zaproponuj wymianę
          </v-btn>
          <v-btn
            style="margin-top: 0.5rem"
            block
            large
            color="#00B88D"
          >
            Kup
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "OfferSnippet",
  props: ['bookTitle', 'bookAuthor', 'offerImages', 'offerIssuer', 'thumbnail', 'sellerName', 'offerType', 'price', 'shipping', 'isbn', 'condition', 'grade'],
  methods: {

  },
  data() {
    return {
      pictureIndex: 0
    }
  },
  computed: {
    pictures() {
      if (this.thumbnail === undefined) {
        return [{
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        }]
      }
      let pictures = []
      pictures.push(this.offerImages.thumbnail)

      return pictures
    },
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

      switch (this.offerType) {
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
    },
    canBuy() {
      return this.offerType !== 'EXCHANGE_ONLY';
    },
    theCheapestMethodPrice() {
      if (this.shipping === undefined) return 0

      let price = this.shipping[0].price

      this.shipping.forEach(shipping => {
        if (shipping.price > 0 && shipping.price < price) price = shipping.price
      })

      return price/100
    },
    bookCondition() {
      switch (this.condition) {
        case 'NEW': return 'NOWA'
        case 'PERFECT': return 'UŻYWANA'
        case 'LIGHTLY_USED': return 'WIDOCZNE ŚLADY UŻYTKOWANIA'
        case 'MODERATLY_USED': return 'LICZNE ŚLADY UŻYTKOWANIA'
        case 'BAD': return 'W ZŁYM STANIE'
        default: return 'NIEZNANY'
      }
    }
  }
}
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