<template>
  <v-layout fill-height>
    <v-container
        class="main"
    >
      <v-card elevation="0" max-width="500">
        <v-card-title>
          {{ $t('purchasedFailedPage.title') }}
        </v-card-title>

        <v-card-text class="message-container">
          <span v-if="showAllFailedMsg">{{ $t('purchasedFailedPage.allFailedDescription') }}</span>
          <span v-else>{{ $t('purchasedFailedPage.someFailedDescription') }}</span>
          <span>{{ reason }}</span>
        </v-card-text>

        <v-card-actions>
          <v-btn
              text
              block
              color="primary"
              @click="$router.push({ name: 'Checkout' })"
          >
            {{ $t('purchasedFailedPage.button') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    reason: {
      type: String,
      required: true
    },
    allFailed: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const showAllFailedMsg = props.allFailed === 'true';

    return {
      showAllFailedMsg
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-container {
  display: flex;
  flex-direction: column;
}
</style>
