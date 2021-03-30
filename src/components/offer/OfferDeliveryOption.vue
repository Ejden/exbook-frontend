<template>
  <tr>
    <td>
      {{ name }}
    </td>
    <td>
      {{ price / 100 }} zł
    </td>
  </tr>
</template>

<script>
export default {
  name: "OfferDeliveryOption",
  props: ['name', 'price']
}
</script>

<style scoped>

</style>