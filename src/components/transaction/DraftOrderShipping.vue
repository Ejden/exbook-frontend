<template>
  <div>
    <h4>Dostawa</h4>

    <span v-if="shippingOptions.length === 0">Brak możliwości wyznaczenia wspólnej dostawy. Usuń niektóre przedmioty z koszyka.</span>

    <div v-else>
      <h5 v-if="showDeliveryAddress">Adres dostawy</h5>
      <draft-order-delivery-address
          v-if="showDeliveryAddress"
          :shipping-address="shippingAddress"
          @changeAddress="changeAddressEventHandler"
      />

      <h5 v-if="showPickupPoint">Punkt dostawy</h5>
      <draft-order-pickup-point
          v-if="showPickupPoint"
          :pickup-point="pickupPoint"
          @changePickupPoint="changePickupPointEventHandler"
      />

      <v-radio-group v-model="selectedShippingMethod">
        <template v-slot:label>
          <span>Sposób dostawy</span>
        </template>
        <v-radio
            v-for="shippingOption in shippingOptions"
            :key="shippingOption.shippingMethodId"
            :value="shippingOption"
            @change="pickedShippingMethodEventHandler(shippingOption)"
        >
          <template v-slot:label>
            <span>{{ shippingOption.shippingMethodName }} - {{ shippingOption.price.amount }} {{ shippingOption.price.currency }}</span>
          </template>
        </v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';
import {
  PreviewPurchasePickupPointData,
  PreviewPurchaseShippingAddressData,
  PreviewPurchaseShippingOption
} from '@/api/TransactionApi';
import DraftOrderDeliveryAddress from '@/components/transaction/DraftOrderDeliveryAddress.vue';
import { ShippingMethodType } from '@/api/CommonTypings';
import DraftOrderPickupPoint from '@/components/transaction/DraftOrderPickupPoint.vue';

export default defineComponent({
  components: {DraftOrderPickupPoint, DraftOrderDeliveryAddress},
  props: {
    shippingOptions: {
      type: Array as PropType<Array<PreviewPurchaseShippingOption>>,
      required: true
    },
    defaultSelectedShipping: {
      type: Object as PropType<PreviewPurchaseShippingOption | undefined | null>,
      required: false
    },
    shippingAddress: {
      type: Object as PropType<PreviewPurchaseShippingAddressData | undefined | null>,
      required: false
    },
    pickupPoint: {
      type: Object as PropType<PreviewPurchasePickupPointData | undefined | null>,
      required: false
    },
    showAddress: {
      type: Boolean,
      required: true
    },
    showPickupPoint: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedShippingMethod = ref<PreviewPurchaseShippingOption | undefined | null>(
        props.shippingOptions.find(option => option.shippingMethodId == props.defaultSelectedShipping?.shippingMethodId)
    );
    const pickedShippingMethodEventHandler = (shippingOption: PreviewPurchaseShippingOption) => {
      selectedShippingMethod.value = shippingOption;
      emit('pickedShippingMethod', shippingOption);
    }
    const showDeliveryAddress = computed(() => props.shippingAddress !== undefined &&
        selectedShippingMethod.value?.shippingMethodType === ShippingMethodType.ADDRESS_DELIVERY && props.showAddress
    );
    const changeAddressEventHandler = () => emit('changeAddress');
    const changePickupPointEventHandler = () => emit('changePickupPoint');

    return {
      pickedShippingMethodEventHandler,
      selectedShippingMethod,
      showDeliveryAddress,
      changeAddressEventHandler,
      changePickupPointEventHandler
    }
  }
});
</script>

<style scoped>

</style>
