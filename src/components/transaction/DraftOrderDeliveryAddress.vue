<template>
  <div class="main">
    <div v-if="showAddress" class="address-container">
      <span>{{ shippingAddress.firstAndLastName }}</span>
      <span>{{ shippingAddress.phoneNumber }}</span>
      <span>{{ shippingAddress.email }}</span>
      <span>{{ shippingAddress.address }}</span>
      <span>{{ shippingAddress.postalCode }}, {{ shippingAddress.city }}, {{ shippingAddress.country }}</span>
    </div>

    <div>
      <v-btn
          plain
          color="primary"
          class="pl-0"
          @click="changeAddressEventHandler"
      >
        {{ $t('basketTransaction.changeShipping') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { PreviewPurchaseShippingAddressData } from '@/api/TransactionApi';

export default defineComponent({
  props: {
    shippingAddress: {
      type: Object as PropType<PreviewPurchaseShippingAddressData | undefined | null>,
      required: false
    }
  },
  setup(props, { emit }) {
    const changeAddressEventHandler = () => emit('changeAddress');
    const showAddress = computed(() => {
      if (props.shippingAddress === null || props.shippingAddress === undefined) {
        return false;
      }

      if (props.shippingAddress.address.trim().length === 0) return false;
      if (props.shippingAddress.city.trim().length === 0) return false;
      if (props.shippingAddress.email.trim().length === 0) return false;
      if (props.shippingAddress.postalCode.trim().length === 0) return false;
      if (props.shippingAddress.phoneNumber.trim().length === 0) return false;
      if (props.shippingAddress.firstAndLastName.trim().length === 0) return false;
      if (props.shippingAddress.country.trim().length === 0) return false;

      return true;
    });

    return {
      changeAddressEventHandler,
      showAddress
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.address-container {
  display: flex;
  flex-direction: column;
}
</style>
