<template>
  <div>
    <h4>Dostawa</h4>

    <span v-if="shippingOptions.length === 0">Brak możlwiości wyznaczenia wspólnej dostawy. Usuń niektóre przedmioty z koszyka.</span>

    <v-radio-group v-else>
      <v-radio
          v-for="shippingOption in shippingOptions"
          :key="shippingOption.shippingMethodId"
          :value="shippingOption.shippingMethodId"
          @change="pickedShippingMethodEventHandler(shippingOption.shippingMethodId)"
      >
        <template v-slot:label>
          {{ shippingOption.shippingMethodName }} - {{ shippingOption.price.amount }} {{ shippingOption.price.currency }}
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { PreviewPurchaseShippingOption } from '@/api/TransactionApi';

export default defineComponent({
  props: {
    shippingOptions: {
      type: Array as PropType<Array<PreviewPurchaseShippingOption>>,
      required: true
    },
    defaultSelectedShipping: {
      type: Object as PropType<PreviewPurchaseShippingOption | undefined>,
      required: false
    }
  },
  setup(_, { emit }) {
    const pickedShippingMethodEventHandler = (shippingMethodId: string) => {
      emit('pickedShippingMethod', shippingMethodId);
    }

    return {
      pickedShippingMethodEventHandler
    }
  }
});
</script>

<style scoped>

</style>
