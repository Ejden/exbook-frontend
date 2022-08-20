<template>
  <div>
    <message-popup
        v-model="showPopup"
        :message="$t('offer.addedToBasket')"
        :close-message="$t('offer.closeInfoMessage')"
    />

    <message-popup
        v-model="showErrorPopup"
        :message="$t('offer.errorMessage')"
        :close-message="$t('offer.closeInfoMessage')"
    />

    <v-container v-if="offer">
      <offer-snippet
          :offer="offer"
          @itemAddedToBasket="itemAddedToBasketEventHandler"
          @errorOnAddingToBasket="errorOnAddingToBasketEventHandler"
      />
    </v-container>

    <v-container v-if="offer">
      <offer-description
          :description="offer.description"
      />
    </v-container>

    <v-container v-if="offer">
      <other-seller-offers
        :offers="[]"
      />
    </v-container>

    <v-container v-if="offer">
      <offer-delivery
        :deliveries="offer.shipping.shippingMethods"
      />
    </v-container>

    <v-container v-if="offer">
      <seller-info
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
import MessagePopup from '@/components/message-popup/MessagePopup.vue';

export default defineComponent({
  components: {
    MessagePopup,
    SellerInfo,
    OfferSnippet,
    OfferDelivery,
    OtherSellerOffers,
    OfferDescription
  },
  setup(_, { root }) {
    const offer = ref<DetailedOffer | undefined>(undefined);
    const showPopup = ref(false);
    const showErrorPopup = ref(false);

    onMounted(() => getSingleOffer(root.$route.params.offerId)
      .then(r => offer.value = r)
      .catch(() => root.$router.push({ name: 'NotFound' }))
      .then(() => publishOfferViewEvent({ offerId: offer.value!.id, viewer: { userId: userModuleStore.getLoggedUser?.id } }))
    );

    const itemAddedToBasketEventHandler = () => {
      showPopup.value = true;
    }

    const errorOnAddingToBasketEventHandler = () => {
      showErrorPopup.value = true;
    }

    return {
      offer,
      showPopup,
      showErrorPopup,
      itemAddedToBasketEventHandler,
      errorOnAddingToBasketEventHandler
    }
  }
})
</script>

<style scoped>
</style>
