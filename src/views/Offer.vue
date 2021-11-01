<template>
  <div class="transparent">
    <v-container v-if="offer" class="transparent">
      <OfferSnippet
          class="glass"
          :book-title="offer.book.title"
          :book-author="offer.book.author"
          :thumnbail="offer.images.thumbnail"
          :offer-images="offer.images.otherImages"
          :seller-name="offer.seller.username"
          :offer-type="offer.type"
          :cost="offer.cost"
          :shipping="offer.shipping.shippingMethods"
          :isbn="offer.book.isbn"
          :condition="offer.book.condition"
          :grade="offer.seller.grade"
          :the-cheapest-shipping-method="offer.shipping.cheapestMethod"
      />
    </v-container>

    <v-container>
      <OfferDescription
          class="glass"
          :description="offer.description"
      />
    </v-container>

    <v-container>
      <OtherSellerOffers
          class="glass"
        :offers="[]"
      />
    </v-container>

    <v-container v-if="offer">
      <OfferDelivery
          class="glass"
        :deliveries="offer.shipping.shippingMethods"
      />
    </v-container>

    <v-container>
      <SellerInfo
          class="glass"
        :id="offer.seller.id"
        :first-name="offer.seller.firstName"
        :last-name="offer.seller.lastName"
        :username="offer.seller.username"
        :grade="offer.seller.grade"
      />
    </v-container>
  </div>

</template>

<script>
import axios from "axios";
import OfferSnippet from "../components/offer/OfferSnippet";
import OfferDescription from "../components/offer/OfferDescription";
import OtherSellerOffers from "../components/offer/OtherSellerOffers";
import OfferDelivery from "../components/offer/OfferDelivery";
import SellerInfo from "../components/offer/SellerInfo";

export default {
  name: "Offer",
  components: {SellerInfo, OfferSnippet, OfferDelivery, OtherSellerOffers, OfferDescription},
  data() {
    return {
      offer: {
        book: {
          title: ''
        },
        images: {
          thumbnail: ''
        },
        description: '',
        seller: {
          username: ''
        },
        shipping: {

        }
      }
    }
  },
  methods: {

  },
  beforeCreate() {
    let offerUrl = 'api/listing/' + this.$route.params.offerId
    axios.get(offerUrl).then(response => {
      this.offer = response.data
      console.log(response)
    }).catch(error => {
      if (error.response.status === 404) {
        this.$router.push({ name: 'NotFound' })
      }
      console.log(error)
    })
  }
}
</script>

<style scoped>
 .glass {
   background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.7)
   );
   backdrop-filter: blur(10px);
 }

 .transparent {
   background: transparent;
 }
</style>