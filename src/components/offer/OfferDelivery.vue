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
                :name="delivery.methodName"
                :price="delivery.price"
            />
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import OfferDeliveryOption from "@/components/offer/OfferDeliveryOption";
export default {
  name: "OfferDelivery",
  components: {OfferDeliveryOption},
  props: ['deliveries']
}
</script>

<style scoped>

</style>