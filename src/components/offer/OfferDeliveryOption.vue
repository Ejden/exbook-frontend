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

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import {Money} from '@/api/ListingApi';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    cost: {
      type: Object as PropType<Money>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
