<template>
  <div class="main">
    <div class="buyer-info">
      <div>
        <h4>{{ shippingType }}</h4>
        <div v-if="showAddressDetails" class="address-details">
          <div>{{ shipping.shippingAddress.firstAndLastName }}</div>
          <div>{{ shipping.shippingAddress.phoneNumber }}</div>
          <div>{{ shipping.shippingAddress.email }}</div>
          <div>{{ shipping.shippingAddress.address }}</div>
          <div>
             {{ shipping.shippingAddress.postalCode }},
             {{ shipping.shippingAddress.city }},
             {{ shipping.shippingAddress.country}}
          </div>
        </div>

        <div v-if="showPickupPointDetails">
          <div>{{ shipping.pickupPoint.firstAndLastName }}</div>
          <div>{{ shipping.pickupPoint.phoneNumber }}</div>
          <div>{{ shipping.pickupPoint.email }}</div>
          <div>{{ shipping.pickupPoint.pickupPointId }}</div>
        </div>

        <div v-if="showPersonalDeliveryDetails">
          <span>{{ $t('soldOrderDetailsPage.noShippingDetails') }}</span>
        </div>
      </div>

      <div>
        <h4>{{ $t('soldOrderDetailsPage.shippingMethod') }}</h4>
        <span>{{ shipping.methodName }}</span>
      </div>

      <div>
        <h4>{{ $t('soldOrderDetailsPage.orderId') }}</h4>
        <span>{{ order.id }}</span>
      </div>
    </div>

    <div class="seller-info">
      <div v-if="showAddressSellerDetails" class="address-details">
        <h4>{{ $t('soldOrderDetailsPage.sellerShippingAddress') }}</h4>
        <div>{{ sellerShipping.address.firstAndLastName }}</div>
        <div>{{ sellerShipping.address.phoneNumber }}</div>
        <div>{{ sellerShipping.address.email }}</div>
        <div>{{ sellerShipping.address.address }}</div>
        <div>
            {{ sellerShipping.address.postalCode }},
             {{ sellerShipping.address.city }},
             {{ sellerShipping.address.country}}
          </div>
      </div>

      <div v-if="showPickupPointSellerDetails">
        <h4>{{ $t('soldOrderDetailsPage.sellerShippingAddress') }}</h4>
        <div>{{ sellerShipping.pickupPoint.firstAndLastName }}</div>
        <div>{{ sellerShipping.pickupPoint.phoneNumber }}</div>
        <div>{{ sellerShipping.pickupPoint.email }}</div>
        <div>{{ sellerShipping.pickupPoint.pickupPointId }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { SellerShippingInfo, Shipping, UserOrderSnippet } from '@/api/OrderApi';
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
    },
    sellerShipping: {
      type: Object as PropType<SellerShippingInfo | undefined>,
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
    const showPersonalDeliveryDetails = props.shipping.methodType === ShippingMethodType.PERSONAL_DELIVERY;
    const showAddressSellerDetails = props.sellerShipping?.address !== undefined && props.sellerShipping?.address !== null;
    const showPickupPointSellerDetails = props.sellerShipping?.pickupPoint !== undefined && props.sellerShipping?.pickupPoint !== null;

    return {
      shippingType,
      showAddressDetails,
      showPickupPointDetails,
      showPersonalDeliveryDetails,
      showAddressSellerDetails,
      showPickupPointSellerDetails
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
}

.address-details {
  display: flex;
  flex-direction: column;
}

.buyer-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
}

.seller-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 24px;
}
</style>
