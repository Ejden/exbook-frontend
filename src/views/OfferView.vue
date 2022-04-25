<template>
  <div>
    <v-container v-if="offer">
      <OfferSnippet
          :offer="offer"
      />
    </v-container>

    <v-container v-if="offer">
      <OfferDescription
          :description="offer.description"
      />
    </v-container>

    <v-container v-if="offer">
      <OtherSellerOffers
        :offers="[]"
      />
    </v-container>

    <v-container v-if="offer">
      <OfferDelivery
        :deliveries="offer.shipping.shippingMethods"
      />
    </v-container>

    <v-container v-if="offer">
      <SellerInfo
        :seller="offer.seller"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import OfferSnippet from '../components/offer/OfferSnippet.vue';
import OfferDescription from '../components/offer/OfferDescription.vue';
import OtherSellerOffers from '../components/offer/OtherSellerOffers.vue';
import OfferDelivery from '../components/offer/OfferDelivery.vue';
import SellerInfo from '../components/offer/SellerInfo.vue';
import { DetailedOffer, getSingleOffer } from '@/api/ListingApi';
import { publishOfferViewEvent } from '@/api/AnalyticsApi';
import { userModuleStore } from '@/utils/store-accessor';

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
      .catch(() => root.$router.push({ name: 'NotFound' }))
      .then(() => publishOfferViewEvent({ offerId: offer.value!.id, viewer: { userId: userModuleStore.getLoggedUser?.id } }))
    );

    return {
      offer
    }
  }
})
</script>

<style scoped>
</style>
