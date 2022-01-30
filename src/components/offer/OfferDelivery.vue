<template>
  <v-card>
    <v-card-title>Dostawa</v-card-title>

    <v-card-text>
      <v-simple-table>
        <template>
          <thead>
          </thead>
          <tbody>
            <OfferDeliveryOption
                v-for="(delivery, i) in deliveries"
                :key="i"
                :name="delivery.name"
                :cost="delivery.cost"
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
