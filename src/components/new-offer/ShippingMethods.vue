<template>
  <v-card-text>
    <span class="form-label">Metody dostawy*</span>

    <div>
      <div class="d-flex justify-space-between" v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
        <v-checkbox
            v-model="selectedShippingMethods"
            :label="shippingMethod.name"
            :value="shippingMethod"
            @change="$emit('changeShipping', selectedShippingMethods)"
        ></v-checkbox>

        <v-text-field
            class="shipping-price-input"
            :disabled="!shippingMethod.defaultCost.canBeOverridden"
            outlined
            dense
            suffix="zł"
            v-model="shippingMethod.price.amount"
            @change="$emit('changeShipping', selectedShippingMethods)"
        ></v-text-field>
      </div>
    </div>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { getShippingMethods } from '@/api/ShippingApi';
import { NewOfferShippingMethod } from './typings/NewOfferShippingMethod';

export default defineComponent({
  setup() {
    const shippingMethods = ref<NewOfferShippingMethod[]>([]);
    const selectedShippingMethods = ref([]);
    const checkbox = ref(false);

    onMounted(() => {
      getShippingMethods()
          .then(response => {
            response.forEach(shippingMethod => {
              shippingMethods.value.push({
                ...shippingMethod,
                price: shippingMethod.defaultCost
              } as NewOfferShippingMethod);
            });
          })
          .catch(error => console.log(error));
    });

    return {
      shippingMethods,
      selectedShippingMethods,
      checkbox
    }
  }
});
</script>

<style scoped>
  .form-label {
    font-weight: 500;
  }

  .shipping-price-input {
    flex-basis: 80pt;
    flex-shrink: 0;
    flex-grow: 0;
  }
</style>
