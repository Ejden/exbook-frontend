<template>
  <div class="transparent">
    <v-container v-if="offer" class="transparent">
      <OfferSnippet
          class="glass"
          :offer="offer"
      />
    </v-container>

    <v-container v-if="offer">
      <OfferDescription
          class="glass"
          :description="offer.description"
      />
    </v-container>

    <v-container v-if="offer">
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

    <v-container v-if="offer">
      <SellerInfo
          class="glass"
        :seller="offer.seller"
      />
    </v-container>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import OfferSnippet from "../components/offer/OfferSnippet.vue";
import OfferDescription from "../components/offer/OfferDescription.vue";
import OtherSellerOffers from "../components/offer/OtherSellerOffers.vue";
import OfferDelivery from "../components/offer/OfferDelivery.vue";
import SellerInfo from "../components/offer/SellerInfo.vue";
import {DetailedOffer, getSingleOffer} from "@/api/ListingApi";

export default defineComponent({
  components: {
    SellerInfo,
    OfferSnippet,
    OfferDelivery,
    OtherSellerOffers,
    OfferDescription
  },
  setup(_, { root }) {
    const offer = ref<DetailedOffer | undefined>(undefined);
    onMounted(() => getSingleOffer(root.$route.params.offerId)
      .then(r => offer.value = r)
      .catch(() => root.$router.push({ name: 'NotFound' })));

    return {
      offer
    }
  }
})
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
