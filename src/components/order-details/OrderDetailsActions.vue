<template>
  <div class="main">
    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
        :disabled="!actions.canBeMarkedAsDelivered"
    >
      {{ $t('orderDetailsPage.action.received') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="primary"
        large
        :ripple="false"
    >
      {{ $t('orderDetailsPage.action.rateSeller') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="primary"
        large
    >
      {{ $t('orderDetailsPage.action.rateOffer') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="primary"
        large
    >
      {{ $t('orderDetailsPage.action.rateBook') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="primary"
        large
        :disabled="!actions.canBeCancelled"
    >
      {{ $t('orderDetailsPage.action.cancel') }}
    </v-btn>

    <v-btn
        class="button"
        elevation="0"
        text
        color="#1976d2"
        large
        :disabled="!actions.canBeReturned"
    >
      {{ $t('orderDetailsPage.action.return') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { BuyerActions } from '@/api/OrderApi';

export default defineComponent({
  props: {
    actions: {
      type: Object as PropType<BuyerActions>,
      required: true
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.button:before {
  background: transparent;
}

@media screen and (max-width: 900px) {
  .main {
    align-items: center;
  }
}
</style>
