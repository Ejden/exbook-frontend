<template>
  <div class="glass rounded container">
    <div class="group-title">
      <h3>{{ $t('basketTransaction.seller') }} {{ draftOrder.seller.firstName }} {{ draftOrder.seller.lastName }}</h3>
      <h5>{{ $t('basketTransaction.orderType') }} {{ orderTypeText }}</h5>
    </div>

    <div class="basket-items">
      <draft-order-item
          class="basket-item"
          v-for="item in draftOrder.items"
          :key="item.offer.id"
          :item="item"
      ></draft-order-item>
    </div>

    <v-divider class="margin-top-8 margin-bottom-8"/>

    <draft-order-group-summary
        :total-offers-price="draftOrder.totalOffersPrice"
    />

    <div v-if="showExchangeBooks">
      <v-divider class="margin-top-8 margin-bottom-8"/>

      <draft-order-exchange-books :exchange-books="draftOrder.exchangeBooks"/>
    </div>

    <v-divider class="margin-top-8 margin-bottom-8"/>

    <div>
      <draft-order-shipping
        :shipping-options="draftOrder.availableShippingMethods"
        :shipping-address="shippingAddress"
        :pickup-point="pickupPoint"
        :default-selected-shipping="defaultSelectedShipping"
        :show-address="showAddress"
        :show-pickup-point="showPickupPoint"
        @pickedShippingMethod="pickedShippingMethodEventHandler"
        @changeAddress="changeAddressEventHandler"
        @changePickupPoint="changePickupPointEventHandler"
      />
    </div>

    <shipping-address-modal
        width="500"
        v-model="showAddressModal"
        @deliveryAddressUpdated="deliveryAddressUpdatedEventHandler"
    />

    <pickup-point-modal
      width="500"
      v-model="showPickupPointModal"
      @pickupPointUpdated="pickupPointUpdatedEventHandler"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';
import {
  DraftPurchaseOrder,
  PreviewPurchasePickupPointData,
  PreviewPurchaseShippingAddressData,
  PreviewPurchaseShippingOption
} from '@/api/TransactionApi';
import { OrderType, ShippingMethodType } from '@/api/CommonTypings';
import DraftOrderItem from '@/components/transaction/DraftOrderItem.vue';
import DraftOrderGroupSummary from '@/components/transaction/DraftOrderGroupSummary.vue';
import DraftOrderExchangeBooks from '@/components/transaction/DraftOrderExchangeBooks.vue';
import DraftOrderShipping from '@/components/transaction/DraftOrderShipping.vue';
import ShippingAddressModal from '@/components/transaction/ShippingAddressModal.vue';
import { PickedShippingMethodEvent } from '@/components/transaction/@types/PickedShippingMethodEvent';
import PickupPointModal from '@/components/transaction/PickupPointModal.vue';

export default defineComponent({
  components: {
    PickupPointModal,
    DraftOrderShipping,
    DraftOrderExchangeBooks,
    DraftOrderGroupSummary,
    DraftOrderItem,
    ShippingAddressModal
  },
  props: {
    draftOrder: {
      type: Object as PropType<DraftPurchaseOrder>,
      required: true
    }
  },
  setup(props, { emit }) {
    const showExchangeBooks = computed(() => props.draftOrder.orderType === OrderType.EXCHANGE);
    const showAddressModal = ref(false);
    const showPickupPointModal = ref(false);
    const orderTypeText = (props.draftOrder.orderType === OrderType.BUY) ? 'Kupno' : 'Wymiana';
    const shippingAddress = ref<PreviewPurchaseShippingAddressData | undefined | null>(props.draftOrder.shipping?.shippingAddress);
    const pickupPoint = ref<PreviewPurchasePickupPointData | undefined | null>(props.draftOrder.shipping?.pickupPoint);
    const defaultSelectedShipping = props.draftOrder.availableShippingMethods
        .find(option => option.shippingMethodId == props.draftOrder.shipping?.shippingMethod.id);
    const showAddress = ref(defaultSelectedShipping?.shippingMethodType === ShippingMethodType.ADDRESS_DELIVERY);
    const showPickupPoint = ref(defaultSelectedShipping?.shippingMethodType === ShippingMethodType.PICKUP_DELIVERY);
    const selectedShipping = ref(defaultSelectedShipping);

    const pickedShippingMethodEventHandler = (shippingOption: PreviewPurchaseShippingOption) => {
      selectedShipping.value = shippingOption;
      if (shippingOption.shippingMethodType === ShippingMethodType.PERSONAL_DELIVERY) {
        showAddress.value = false;
        showPickupPoint.value = false;
        emit('pickedShippingMethod', {
          sellerId: props.draftOrder.seller.id,
          orderType: props.draftOrder.orderType,
          orderId: props.draftOrder.orderId,
          shippingMethodId: shippingOption.shippingMethodId
        } as PickedShippingMethodEvent);
      }
      if (shippingOption.shippingMethodType === ShippingMethodType.PICKUP_DELIVERY) {
        if (pickupPoint.value === null || pickupPoint.value === undefined) {
          showPickupPointModal.value = true;
        }
      }
      if (shippingOption.shippingMethodType === ShippingMethodType.ADDRESS_DELIVERY) {
        if (shippingAddress?.value === null || shippingAddress?.value === undefined) {
          showAddressModal.value = true;
        } else {
          emit('pickedShippingMethod', {
            sellerId: props.draftOrder.seller.id,
            orderType: props.draftOrder.orderType,
            orderId: props.draftOrder.orderId,
            shippingMethodId: selectedShipping.value.shippingMethodId,
            shippingAddress: shippingAddress.value
          } as PickedShippingMethodEvent);
        }
      }
    }

    const deliveryAddressUpdatedEventHandler = (address: PreviewPurchaseShippingAddressData) => {
      shippingAddress.value = address;
      if (selectedShipping.value?.shippingMethodType === ShippingMethodType.ADDRESS_DELIVERY) {
        showAddress.value = true;
        showPickupPoint.value = false;

        emit('pickedShippingMethod', {
          sellerId: props.draftOrder.seller.id,
          orderType: props.draftOrder.orderType,
          orderId: props.draftOrder.orderId,
          shippingMethodId: selectedShipping.value.shippingMethodId,
          shippingAddress: address
        } as PickedShippingMethodEvent);
      }
    }
    const pickupPointUpdatedEventHandler = (eventData: PreviewPurchasePickupPointData) => {
      pickupPoint.value = eventData;
      if (selectedShipping.value?.shippingMethodType === ShippingMethodType.PICKUP_DELIVERY) {
        showAddress.value = false;
        showPickupPoint.value = true;

        emit('pickedShippingMethod', {
          sellerId: props.draftOrder.seller.id,
          orderType: props.draftOrder.orderType,
          orderId: props.draftOrder.orderId,
          shippingMethodId: selectedShipping.value.shippingMethodId,
          pickupPoint: eventData
        } as PickedShippingMethodEvent);
      }
    }

    const changeAddressEventHandler = () => {
      showAddressModal.value = true;
    }
    const changePickupPointEventHandler = () => {
      showPickupPointModal.value = true;
    }

    return {
      showExchangeBooks,
      orderTypeText,
      pickedShippingMethodEventHandler,
      deliveryAddressUpdatedEventHandler,
      pickupPointUpdatedEventHandler,
      showAddressModal,
      showPickupPointModal,
      shippingAddress,
      pickupPoint,
      changeAddressEventHandler,
      changePickupPointEventHandler,
      defaultSelectedShipping,
      showAddress,
      showPickupPoint
    }
  }
});
</script>

<style scoped>
.group-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.basket-items {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 16px;
}

@media screen and (max-width: 768px) {
  .group-title {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
