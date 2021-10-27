<template>
  <tr>
    <td>
      {{ name }}
    </td>
    <td>
      {{ cost.amount }} zł
    </td>
  </tr>
</template>

<script>
export default {
  name: "OfferDeliveryOption",
  props: ['name', 'cost']
}
</script>

<style scoped>

</style>