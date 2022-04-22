<template>
  <div class="main">
    <div v-if="showPickupPoint" class="pickup-point-container">
      <span>{{ pickupPoint.firstAndLastName }}</span>
      <span>{{ pickupPoint.phoneNumber }}</span>
      <span>{{ pickupPoint.email }}</span>
      <span>Numer punktu: {{ pickupPoint.pickupPointId }}</span>
    </div>

    <div>
      <v-btn
          plain
          color="primary"
          class="pl-0"
          @click="changePickupPointEventHandler"
      >
        Zmień
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { PreviewPurchasePickupPointData } from '@/api/TransactionApi';

export default defineComponent({
  props: {
    pickupPoint: {
      type: Object as PropType<PreviewPurchasePickupPointData | undefined | null>,
      required: false
    }
  },
  setup(props, { emit }) {
    const changePickupPointEventHandler = () => emit('changePickupPoint');
    const showPickupPoint = computed(() => {
      return !(props.pickupPoint === null || props.pickupPoint === undefined);
    });

    return {
      showPickupPoint,
      changePickupPointEventHandler
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.pickup-point-container {
  display: flex;
  flex-direction: column;
}
</style>
