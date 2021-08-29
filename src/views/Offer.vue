<template>
  <div>
    <v-container>
      <OfferSnippet
          v-if="offer"
          :book-title="offer.book.title"
          :book-author="offer.book.author"
          :thumnbail="offer.images.thumbnail"
          :offer-images="offer.images.otherImages"
          :seller-name="offer.seller.username"
          :offer-type="offer.type"
          :cost="offer.cost"
          :shipping="offer.shippingMethods"
          :isbn="offer.book.isbn"
          :condition="offer.book.condition"
          :grade="offer.seller.grade"
      />
    </v-container>

    <v-container>
      <OfferDescription
          :description="offer.description"
      />
    </v-container>

    <v-container>
      <OtherSellerOffers
        :offers="[]"
      />
    </v-container>

    <v-container>
      <OfferDelivery
        :deliveries="offer.shippingMethods"
      />
    </v-container>

    <v-container>
      <SellerInfo
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
  components: {SellerInfo, OfferDelivery, OtherSellerOffers, OfferDescription, OfferSnippet},
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
        }
      }
    }
  },
  methods: {

  },
  beforeCreate() {
    let offerUrl = 'api/offers/' + this.$route.params.offerId
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

</style>