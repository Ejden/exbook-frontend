<template>
  <div class="margin-top-8">
    <v-container
        v-if="transactionIsLoading"
        class="loading-container rounded"
    >
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
      />

      <span class="margin-top-16">{{ $t('basketTransaction.loading') }}</span>
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
            :loading="loading"
            :button-enabled="detailedDraftPurchase.isPurchasable"
            :is-shipping-info-complete="detailedDraftPurchase.isShippingInfoComplete"
            @makePurchase="makePurchaseEventHandler"
        />
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import {
  DetailedDraftPurchase,
  previewPurchase,
  PreviewPurchaseOrderData, PreviewPurchasePickupPointData, PreviewPurchaseShippingAddressData,
  PreviewPurchaseShippingData, realisePurchase
} from '@/api/TransactionApi';
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
      transactionIsLoading, enableTransactionLoadingAnimation, disableTransactionLoadingAnimation
    } = transactionLoading();
    const { loading, enableLoading, disableLoading } = loadingButton();

    const detailedDraftPurchase = ref<DetailedDraftPurchase | undefined>(undefined);
    const pickedShippingMethodEventHandler = (event : PickedShippingMethodEvent) => {
      enableLoading();

      if (detailedDraftPurchase.value !== undefined) {
        let orders = detailedDraftPurchase.value.orders
            .filter(order => order.shipping !== null)
            .filter(order => order.orderId !== event.orderId)
            .map(order => ({
              sellerId: order.seller.id,
              orderType: order.orderType,
              shipping: {
                shippingMethodId: order.shipping!.shippingMethod.id,
                shippingAddress: order.shipping?.shippingAddress as PreviewPurchaseShippingAddressData,
                pickupPoint: order.shipping?.pickupPoint as PreviewPurchasePickupPointData
              } as PreviewPurchaseShippingData
            } as PreviewPurchaseOrderData));

        orders.push({
          sellerId: event.sellerId,
          orderType: event.orderType,
          shipping: {
            shippingMethodId: event.shippingMethodId,
            shippingAddress: event.shippingAddress,
            pickupPoint: event.pickupPoint
          }
        });

        previewPurchase({ orders: orders })
            .then(response => detailedDraftPurchase.value = response.data)
            .then(disableLoading);
      }
    }

    previewPurchase({ orders: [] })
        .then(response => detailedDraftPurchase.value = response.data)
        .then(() => disableTransactionLoadingAnimation())
        .catch(() => router.push({ name: 'Error' }));

    const makePurchaseEventHandler = () => {
      realisePurchase()
        .then(() => router.push({ name: 'Home' }));
    }

    return {
      transactionIsLoading,
      enableTransactionLoadingAnimation,
      disableTransactionLoadingAnimation,
      loading,
      detailedDraftPurchase,
      pickedShippingMethodEventHandler,
      makePurchaseEventHandler
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

function loadingButton() {
  const loading = ref(false);
  const enableLoading = () => loading.value = true;
  const disableLoading = () => loading.value = false;

  return {
    loading,
    enableLoading,
    disableLoading
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
  top: 80px;
}

@media screen and (max-width: 900px) {
  .basket {
    flex-direction: column;
  }

  .price-container {
    position: static;
  }
}
</style>
