<template>
  <v-card elevation="0">
    <v-card-text>
      <h1 class="mb-7">{{ $t('newOfferForm.addOffer') }}</h1>

      <h3 class="mb-1">{{ $t('newOfferForm.tips.title') }}</h3>
      <ul>
        <li>
          <span>{{ $t('newOfferForm.tips.tip1') }}</span>
        </li>
        <li>
          <span>{{ $t('newOfferForm.tips.tip2') }}</span>
        </li>
        <li>
          <span>{{ $t('newOfferForm.tips.tip3') }}</span>
        </li>
      </ul>

      <v-btn
          class="submit-button mt-7"
          elevation="0"
          block
          large
          color="primary"
          @click="addOffer"
      >
        {{ $t('newOfferForm.submitOffer') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(_, { emit }) {
    const addOffer = () => emit('createOffer');

    return {
      addOffer
    }
  }
})
</script>

<style scoped>
  template {
    background-color: white;
  }

  .submit-button {

  }
</style>
