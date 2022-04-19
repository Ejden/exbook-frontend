<template>
  <div class="margin-top-16">
    <v-container
        v-if="transactionIsLoading"
        class="loading-container rounded"
    >
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
      />

      <span class="margin-top-16">Momencik... Przeliczamy twoje zamówienie</span>
    </v-container>

    <v-container v-else class="basket">
      <div class="basket-groups">
        <basket-transaction-group
            v-for="draftOrder in detailedDraftPurchase.orders"
            :key="draftOrder.orderId"
            :draft-order="draftOrder"
            @pickedShippingMethod="pickedShippingMethodEventHandler"
        />
      </div>

      <v-container class="container-standard-background rounded price-container">
        <draft-purchase-price-container
            :total-cost="detailedDraftPurchase.totalPrice"
            :total-offers-cost="detailedDraftPurchase.totalOffersPrice"
            :shipping-cost="detailedDraftPurchase.totalShippingPrice"
            :loading="false"
            :button-enabled="false"
        />
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api';
import { DetailedDraftPurchase, previewPurchase } from '@/api/TransactionApi';
import router from '@/router';
import BasketTransactionGroup from '@/components/transaction/BasketTransactionGroup.vue';
import DraftPurchasePriceContainer from '@/components/transaction/DraftPurchasePriceContainer.vue';
import { PickedShippingMethodEvent } from '@/components/transaction/@types/PickedShippingMethodEvent';

export default defineComponent({
  components: {
    DraftPurchasePriceContainer,
    BasketTransactionGroup
  },
  setup() {
    const {
      transactionIsLoading,
      enableTransactionLoadingAnimation,
      disableTransactionLoadingAnimation
    } = transactionLoading();
    const detailedDraftPurchase = ref<DetailedDraftPurchase | undefined>(undefined);
    const pickedShippingMethodEventHandler = ({ shippingMethodId, orderId } : PickedShippingMethodEvent) => {
      console.log(shippingMethodId + " " + orderId);
      previewPurchase( { orders: [] })
    }

    onBeforeMount(() => previewPurchase({ orders: [] })
        .then(response => detailedDraftPurchase.value = response.data)
        .then(() => disableTransactionLoadingAnimation())
        .catch(() => router.push({ name: 'Error' }))
    );

    return {
      transactionIsLoading,
      enableTransactionLoadingAnimation,
      disableTransactionLoadingAnimation,
      detailedDraftPurchase,
      pickedShippingMethodEventHandler
    }
  }
});

function transactionLoading() {
  const transactionIsLoading = ref(true);
  const enableTransactionLoadingAnimation = () => transactionIsLoading.value = true;
  const disableTransactionLoadingAnimation = () => transactionIsLoading.value = false;


  return {
    transactionIsLoading,
    enableTransactionLoadingAnimation,
    disableTransactionLoadingAnimation,
  }
}
</script>

<style scoped>
.basket {
  display: flex;
  flex-direction: row;
  gap: 10pt;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.basket-groups {
  display: flex;
  flex-direction: column;
  flex-basis: 66%;
  gap: 15pt;
}

.price-container {
  height: 120pt;
  flex-basis: 34%;
  position: sticky;
  top: 66pt;
}

@media screen and (width: 900px) {
  .basket {
    flex-direction: column;
  }
  .price-container {
    position: unset;
  }
}
</style>
