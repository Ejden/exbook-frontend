<template>
  <div class="main">
    <div>
      <h4>{{ shippingType }}</h4>
      <div v-if="showAddressDetails" class="address-details">
        <span>{{ shipping.shippingAddress.firstAndLastName }}</span>
        <span>{{ shipping.shippingAddress.phoneNumber }}</span>
        <span>{{ shipping.shippingAddress.email }}</span>
        <span>{{ shipping.shippingAddress.address }}</span>
        <span>
          {{ shipping.shippingAddress.postalCode }},
           {{ shipping.shippingAddress.city }},
           {{ shipping.shippingAddress.country}}
        </span>
      </div>
      <div v-if="showPickupPointDetails">
        <span>{{ shipping.pickupPoint.firstAndLastName }}</span>
        <span>{{ shipping.pickupPoint.phoneNumber }}</span>
        <span>{{ shipping.pickupPoint.email }}</span>
        <span>{{ shipping.pickupPoint.pickupPointId }}</span>
      </div>
    </div>

    <div>
      <h4>{{ $t('orderDetailsPage.shippingMethod') }}</h4>
      <span>{{ shipping.methodName }}</span>
    </div>

    <div>
      <h4>Identyfikator zamówienia</h4>
      <span>{{ order.id }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Shipping, UserOrderSnippet } from '@/api/OrderApi';
import { ShippingMethodType } from '@/api/CommonTypings';
import { i18n } from '@/main';

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<UserOrderSnippet>,
      required: true
    },
    shipping: {
      type: Object as PropType<Shipping>,
      required: true
    }
  },
  setup(props) {
    let shippingType = '';
    switch (props.shipping.methodType) {
      case ShippingMethodType.PICKUP_DELIVERY:
        shippingType = i18n.t('orderDetailsPage.shippingType.pickupDelivery') as string;
        break;
      case ShippingMethodType.ADDRESS_DELIVERY:
        shippingType = i18n.t('orderDetailsPage.shippingType.addressDelivery') as string;
        break;
      case ShippingMethodType.PERSONAL_DELIVERY:
        shippingType = i18n.t('orderDetailsPage.shippingType.personalDelivery') as string;
    }
    const showAddressDetails = props.shipping.methodType === ShippingMethodType.ADDRESS_DELIVERY;
    const showPickupPointDetails = props.shipping.methodType === ShippingMethodType.PICKUP_DELIVERY;

    return {
      shippingType,
      showAddressDetails,
      showPickupPointDetails
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
}

.address-details {
  display: flex;
  flex-direction: column;
}
</style>
