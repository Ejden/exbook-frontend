<template>
  <v-card elevation="0">
    <v-card-title>{{ $t('offer.shipping.title') }}</v-card-title>

    <v-card-text>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <td class="pl-0 font-weight-bold">{{ $t('offer.shipping.name') }}</td>
              <td class="font-weight-bold">{{ $t('offer.shipping.price') }}</td>
            </tr>
          </thead>
          <tbody>
            <OfferDeliveryOption
                v-for="(delivery, i) in deliveries"
                :key="i"
                :name="delivery.name"
                :cost="delivery.price"
            />
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import OfferDeliveryOption from './OfferDeliveryOption.vue';
import { ShippingMethod } from '@/api/ListingApi';

export default defineComponent({
  components: {
    OfferDeliveryOption
  },
  props: {
    deliveries: {
      type: Array as PropType<Array<ShippingMethod>>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
